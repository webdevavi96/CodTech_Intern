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

export const sendMail = (email, otp) => {
  const mailOptions = {
    from: user,
    to: email,
    subject: "OTP for confirmation",
    text: `Your One Time Password for registraion is:
   ${otp}
   Do not share with anyone.
  `,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error(error);
      return false;
    }
    console.log("OTP sent!");
    return true;
  });
};
