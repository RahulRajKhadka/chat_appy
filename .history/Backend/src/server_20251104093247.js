import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import { ENV } from "./lib/env.js";

import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

dotenv.config();

const PORT = ENV.PORT || 3000;

const app = express();
const server = http.createServer(app); // Create HTTP server

// Initialize Socket.IO
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Store online users: userId -> socketId
const onlineUsers = new Map();

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId && userId !== "undefined") {
    onlineUsers.set(userId, socket.id);
    console.log(`✅ User ${userId} is now online`);

    // Emit updated online users list to all clients
    io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
  }

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);

    if (userId) {
      onlineUsers.delete(userId);
      console.log(`👋 User ${userId} is now offline`);
      // Emit updated online users list
      io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
    }
  });
});

// Helper function to get receiver's socket ID
export function getReceiverSocketId(userId) {
  return onlineUsers.get(userId);
}

// Middleware
app.use(express.json({ limit: "10mb" })); // For base64 images
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

// Connect to MongoDB and start server
mongoose
  .connect(ENV.MONGODB_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // Use server.listen instead of app.listen for Socket.IO
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`🔌 Socket.IO is ready for connections`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });