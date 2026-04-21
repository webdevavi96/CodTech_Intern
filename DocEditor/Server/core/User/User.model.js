import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    password: { type: String, require: true },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) return;
    this.password = bcrypt.hash(this.password, 10);
    return;
  } catch (error) {
    throw new Error(error);
  }
});

userSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.isUserExist = async function (userId = null, email = null) {
  let isExist = null;

  if (userId) isExist = await User.findOne(userId);
  else isExist = await findOne(email);

  if (!isExist) return 0;

  return 1;
};

export const User = mongoose.model("User", userSchema);
