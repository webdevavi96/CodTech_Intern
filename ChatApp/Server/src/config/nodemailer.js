import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: false,
  auth: {
    user: process.env.BREVO_LOGIN,
    pass: process.env.BREVO_PASSWORD,
  },
});

export const verifySMTP = async () => {
  try {
    await transporter.verify();
    console.log("Brevo SMTP Connected");
  } catch (err) {
    console.error("SMTP verify failed:", err);
  }
};

export const sendMail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.BREVO_SENDER,
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
