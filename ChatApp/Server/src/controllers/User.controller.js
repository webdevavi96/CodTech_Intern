import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.models.js";
import { sendOtp } from "../config/config.js";
import { client } from "../config/redis.conf.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(401).json({
      message: "Wrong credentials!",
      status: 401,
    });

  const user = await User.findOne({ email }).select("+password");
  if (!user)
    return res.status(404).json({
      message: "User not found!",
    });

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect)
    return res.status(401).json(new ApiError(401, "Incorrect password"));

  const sanitisedUser = user.toObject();
  delete sanitisedUser.password;

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };

  return res
    .status(200)
    .cookieOptions("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json({
      message: "login successfulle",
      success: true,
      data: sanitisedUser,
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
  const { username, fullName, email, password } = req.body;

  if ((!username || !fullName || !email, !password))
    return res.status(404).json({
      message: "All; fields are reqired!",
      data: {},
      success: false,
    });

  const { isSent, otp } = sendOtp(email);

  if (!isSent)
    return res.status(501).json({
      message: "Internal server error!",
      success: false,
    });

  const user = {
    username: username,
    fullName: fullName,
    email: email,
    password: password,
  };

  await client.set(username, { user, otp }, { EX: 300, NX: true });

  return res.status(200).json({
    message: "OTP sent successfully!",
    data: username,
    success: true,
  });
});

export const verifyOtpAndRegister = asyncHandler(async (req, res) => {
  const { username, otpInput } = req.body;

  const cachedUser = await client.get(username);

  if (!cachedUser)
    return res.status(400).json({
      message: "OTP Expired",
      success: false,
    });

  const { otp, user } = JSON.parse(cachedUser);

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
