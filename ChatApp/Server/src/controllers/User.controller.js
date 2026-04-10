import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.models.js";
import { sendOtp } from "../config/config.js";
import { client } from "../config/redis.conf.js";
import jwt from "jsonwebtoken";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(401).json({
      message: "Wrong credentials!",
      status: 401,
    });

  const user = await User.findOne({ email: email });
  if (!user)
    return res.status(404).json({
      message: "User not found!",
    });
  const isPasswordCorrect = user.isPasswordCorrect(password);

  if (!isPasswordCorrect)
    return res.status(401).json({ message: "Incorrect password" });

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" } // 1 Day expiry
  );

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  const sanitisedUser= await user.toObject();
  delete sanitisedUser.password;
  

  return res.status(200).cookie("authToken", token, cookieOptions).json({
    message: "login successfulle",
    success: true,
    data: user,
  });
});

export const logOut = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: "" } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      message: "Log out successfull!",
      data: {},
      success: true,
    });
});

export const register = asyncHandler(async (req, res) => {
  const data = req.body;
  console.log(data);

  const { username, name, email, password } = req.body;

  if (!username || !name || !email || !password)
    return res.status(404).json({
      message: "All; fields are reqired!",
      data: {},
      success: false,
    });

  const { isSent, otp } = await sendOtp(email);
  console.log(isSent);

  if (!isSent)
    return res.status(501).json({
      message: "Internal server error!",
      success: false,
    });

  const user = {
    username: username,
    fullname: name,
    email: email,
    password: password,
  };

  await client.set(username, JSON.stringify({ user: user, otp }), {
    EX: 300,
    NX: true,
  });

  return res.status(200).json({
    message: "OTP sent successfully!",
    data: username,
    success: true,
  });
});

export const verifyOtpAndRegister = asyncHandler(async (req, res) => {
  const { otpInput, username } = req.body;
  if (!username || !otpInput) {
    console.log(username, otpInput);
    return res.status(401).json({ message: "Invalid input" });
  }

  const cachedUser = await client.get(username);

  if (!cachedUser)
    return res.status(400).json({
      message: "OTP Expired",
      success: false,
    });

  const { user, otp } = await JSON.parse(cachedUser);
  console.log(user, otp);

  if (otp != parseInt(otpInput))
    return res.status(400).json({
      message: "Invalid OTP",
      success: false,
    });

  await client.del(username);

  const createdUser = await User.create(user);
  if (!createdUser)
    return res.status(501).json({
      message: "Internal server error! Please try again later.",
      success: false,
    });
  return res.status(201).json({
    message: "Account created succfully.",
    success: true,
  });
});

export const profile = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) return res.status(401);

  const user = await User.find(User._id == userId).first();

  if (!user) return res.status(404);

  return res.status(200).json({
    data: user,
    success: true,
  });
});
