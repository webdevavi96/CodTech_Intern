import { generateOtp } from "../utils/OTPgenerator.js";
import { sendMail } from "./nodemailer.js";

export const sendOtp = (email) => {
  const otp = generateOtp();
  const isSent = sendMail(email, otp);
  return isSent, otp;
};
