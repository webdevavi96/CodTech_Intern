import nodemailer from "nodemailer";
import { user, pass } from "../../constant.js";

console.log("user: ", user, "password: ", pass, "length: ", pass.length)

const transporter = nodemailer.createTransport({
  service: "gmail",
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
    console.error(error);
    return false;
  }
};

export const verifySMTP = async () => {
  try {
    await transporter.verify();
    console.log("SMTP connected");
  } catch (err) {
    console.error("SMTP verify failed:", err);
  }
};