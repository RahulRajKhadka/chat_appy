import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  if (!ENV.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  
  const token = jwt.sign({ id: userId }, ENV.JWT_SECRET, {
    expiresIn: "7d",
  });
  
  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: "strict",
    secure: ENV.NODE_ENV !== "development",
  });
  
  return token;
};