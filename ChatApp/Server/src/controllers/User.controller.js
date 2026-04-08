import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.models.js";
import { sendOtp } from "../config/config.js";

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

  const otpStatus = sendOtp(email);

  // save the user into redis db temporarly.
  const user = {
    username: username,
    fullName: fullName,
    email: email,
    password: password,
  };
  const otpLife = 600000; // in ms

  if (!otpStatus)
    return res.status(501).json({
      message: "Internal server error!",
      success: false,
    });

  return res.status(200).json({
    message: "Otp sent successfully!",
    success: true,
  });
});

export const verufyOtpAndRegister = asyncHandler(async (req, res) => {
  const { otp } = req.body;

  // get the user from redis db.
  const user = null;
  const savedOtp = null;
  const otpLife = null;
  let otpExp = 0; // in ms
  const ms = 1000;

  const timer = setTimeout(() => {
    if (otpExp === otpLife) {
      clearInterval(timer);
      return res.status(401).json({
        message: "OTP expired!",
        success: false,
      });
    }

    otpExp += ms;
  }, ms);

  if (otp !== savedOtp)
    return res.status(401).json({
      message: "Incorrect Otp!",
      success: false,
    });

  const createdUser = await User.create(user);
  if (!createdUser)
    return res.status(501).json({
      message: "Internal server error! Please try again after some time.",
      success: false,
    });

  return res.status(201).json({
    message: "Account created successfully!",
    user: user,
    success: true,
  });
});


