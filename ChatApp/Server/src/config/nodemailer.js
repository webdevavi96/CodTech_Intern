import nodemailer from "nodemailer";
import { user, pass } from "../../constant.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: user,
    pass: pass,
  },
});

export const sendMail = async (email, otp) => {
  try {
    const mailOptions = {
      from: user,
      to: email,
      subject: "OTP for confirmation",
      text: `Your One Time Password for registraion is:
           ${otp}
           Do not share with anyone.
   `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
};
