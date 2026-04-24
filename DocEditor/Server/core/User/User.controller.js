import User from "./User.model.js";
import mongoose from "mongoose";

function reqHandler(reqBody = {}, allowedFields = []) {
  const body = {};

  for (const key of allowedFields) {
    if (Object.hasOwn(reqBody, key)) {
      body[key] = reqBody[key];
    }
  }

  return body;
}

export const register = async (req, res) => {
  const body = reqHandler(req.body, [
    "fullname",
    "email",
    "gender",
    "password",
  ]);
  if (body === {} || Object.values(body).length === 3)
    return res.status(400).json({
      message: "All fields are required!",
      data: {},
      success: false,
    });

  if (!User.isUserExist(body?.email))
    return res.status(402).json({
      message: "User allready exist with these credentials",
      data: {},
      success: true,
    });

  const user = await User.create(body);

  if (!user)
    return res.status(501).jaon({
      message: "Internal server error ocuired!",
      data: {},
      success: false,
    });

  return res
    .status(201)
    .json({ message: "Registration successfull", data: {}, success: true });
};

export const login = async (req, res) => {
  const body = reqHandler(req.body, ["username", "email", "password"]);
  if (body === {})
    return res
      .status(400)
      .json({ message: "All fields are required!", data: {}, success: false });

  const user = await User.findOne(body?.username || body?.email);

  if (!user)
    return res
      .status(404)
      .json({ message: "User not found", data: {}, success: true });

  if (!user.isPasswordCorrect(body?.password))
    return res
      .status(404)
      .json({ message: "Wrong credentials", data: {}, success: false });

  return res
    .status(200)
    .json({ message: "Login successfull", data: user, success: true });
};

export const logout = async (req, res) => {
  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(userId))
    return res
      .status(400)
      .json({ message: "Invalid user credentials", data: {}, success: false });

  const user = await User.findOne(userId).select("-password");
  if (!user)
    return res
      .status(404)
      .json({ message: "User not found", data: {}, success: true });

  return res
    .status(200)
    .json({ message: "Logut successfull", data: {}, success: true });
};

export const getMe = async (req, res) => {
  const userId = req.user._id;
  if (!userId || !mongoose.Types.ObjectId(userId))
    return res
      .status(400)
      .json({ message: "Invalid user id", data: {}, success: false });

  const user = await User.findOne(userId).select("-password");

  if (!user)
    return res
      .status(404)
      .json({
        message: "User not found or Invalid user id",
        data: {},
        success: false,
      });

  return res
    .status(200)
    .json({ message: "User data found", data: user, success: true });
};
