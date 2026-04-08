import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { User } from "../models/User.models.js";

export const loginUser = asyncHandler(async (req, res) => {
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
  if (!isPasswordCorrect) {
    return res.status(401).json(new ApiError(401, "Incorrect password"));
  }

  const sanitisedUser = user.toObject();
  delete sanitisedUser.password;

  return res.status(200).json({
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
