import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    uniquE: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken:{
    type: String
  }
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);
