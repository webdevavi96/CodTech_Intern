import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const verifySMTP = async () => {
  try {
    await transporter.verify();
    console.log("Gmail SMTP Connected");
  } catch (err) {
    console.error("SMTP verify failed:", err);
  }
};

export const sendMail = async (email, otp) => {
  try {
    const mailOptions = {
      from: `"ChatApp" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "OTP for Confirmation",
      text: `Your One-Time Password (OTP) is:

      ${otp}

      Do not share this OTP with anyone.`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Send mail error:", error);
    return false;
  }
};
