import nodemailer from "nodemailer";
import { ENV } from "./env.js";

// Create transporter
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASSWORD,
  },
});


transporter.verify((error, success) => {
  if (error) {
    console.error(" Email configuration error:", error);
  } else {
    console.log(" Email server is ready to send messages");
  }
});

export const sender = {
  email: ENV.EMAIL_FROM,
  name: ENV.EMAIL_FROM_NAME || "ChatApp",
};
