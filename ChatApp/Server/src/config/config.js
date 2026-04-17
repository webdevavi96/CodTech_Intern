import { generateOtp } from "../utils/OTPgenerator.js";
import { sendMail } from "./nodemailer.js";

export const sendOtp = async (email) => {
  const otp = generateOtp();
  const isSent = await sendMail(email, otp);

  console.log("from senMail", isSent);

  return { isSent, otp };
};
