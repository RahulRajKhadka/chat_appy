import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { ENV } from "./lib/env.js";

import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

const PORT = ENV.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors(

  {
    oritn
  }
))
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

mongoose
  .connect(ENV.MONGODB_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
