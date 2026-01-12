import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

export const requestOTP = async (req, res) => {
  const otp = crypto.randomInt(100000, 999999);

  req.user.otp = otp;
  req.user.otpExpires = Date.now() + 10 * 60 * 1000;
  await req.user.save();

  await sendEmail({
    to: req.user.email,
    subject: "Password Reset OTP",
    html: `<h2>Your OTP: ${otp}</h2>`,
  });

  res.json({ message: "OTP sent" });
};
