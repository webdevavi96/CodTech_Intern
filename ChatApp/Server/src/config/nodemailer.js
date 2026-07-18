import nodemailer from "nodemailer";
import { user, pass } from "../../constant.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

await transporter.verify();
console.log("SMTP connected");

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
    console.error(error);
    return false;
  }
};
