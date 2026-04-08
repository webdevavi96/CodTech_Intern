import { generateOtp } from "../utils/OTPgenerator.js";

export const sendOtp = async (email) => {
  const otp = generateOtp();
  return true;
};
