// config/database.js
import mongoose from "mongoose";
import { ENV } from "../lib/env.js";

export async function connectDatabase() {
  try {
    await mongoose.connect(ENV.MONGODB_URL);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error(" MongoDB connection error:", error);
    throw error;
  }
}