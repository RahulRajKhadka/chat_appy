// socket.js
import { app,Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === "production" 
      ? process.env.CLIENT_URL 
      : "http://localhost:5173",
    credentials: true,
  },
});

// Store online users: userId -> socketId
const onlineUsers = new Map();

export function getReceiverSocketId(userId) {
  return onlineUsers.get(userId);
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const userId = socket.handshake.query.userId;
  
  if (userId && userId !== "undefined") {
    onlineUsers.set(userId, socket.id);
    io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
  }

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    
    if (userId) {
      onlineUsers.delete(userId);
      io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
    }
  });
});

export { io, app, server };