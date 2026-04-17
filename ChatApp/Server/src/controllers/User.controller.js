import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.models.js";
import { sendOtp } from "../config/config.js";
import { client } from "../config/redis.conf.js";

const isProduction = process.env.NODE_ENV === "production";

// The hidden bug which takes me to debug 3 days. Wrong maxAge in both cookie options. In previous version the access token was alive for 7 days and refresh token was alive for 15 minutes which was inversed logic.
const refreshCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "None" : "Lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const accessCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "None" : "Lax",
  path: "/",
  maxAge: 15 * 60 * 1000,
};

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

  if (!isPasswordCorrect) return res.status(401).json({ message: "Incorrect password" });

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  const sanitisedUser = user.toObject();
  delete sanitisedUser.password;

  await client.set(`user:${user._id}`, JSON.stringify(sanitisedUser), {
    EX: 1800,
  });

  return res
    .status(200)
    .cookie("accessToken", accessToken, accessCookieOptions)
    .cookie("refreshToken", refreshToken, refreshCookieOptions)
    .json({
      message: "login successfulle",
      success: true,
      data: sanitisedUser,
    });
});

export const logOut = asyncHandler(async (req, res) => {
  const userId = req.body._id;
  await User.findByIdAndUpdate(userId, { $unset: { refreshToken: "" } }, { new: true });

  await client.del(req.body._id);

  return res
    .status(200)
    .clearCookie("accessToken", accessCookieOptions)
    .clearCookie("refreshToken", refreshCookieOptions)
    .json({
      message: "Log out successfull!",
      data: {},
      success: true,
    });
});

export const register = asyncHandler(async (req, res) => {
  const { username, name, email, password } = req.body;

  if (!username || !name || !email || !password)
    return res.status(404).json({
      message: "All; fields are reqired!",
      data: {},
      success: false,
    });

  const { isSent, otp } = await sendOtp(email);

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

export const getMe = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const cacheKey = `user:${userId}`;
    let user = await client.get(cacheKey);

    if (user) user = JSON.parse(user);
    else {
      user = await User.findById(userId).select("-password");

      if (!user) return res.status(404).json({ message: "User not found!", success: false });
      await client.set(cacheKey, JSON.stringify(user), {
        EX: 1800,
      });
    }

    return res.status(200).json({ succes: true, data: user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false });
  }
});
