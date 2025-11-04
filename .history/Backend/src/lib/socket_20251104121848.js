import http from "http";
import { Server } from "socket.io";
import { ENV } from "./env.js";

let io;
const onlineUsers = new Map();

export const initializeSocket = (app) => {
  const server = http.createServer(app);
  
  io = new Server(server, {
    cors: {
      origin: ENV.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("👤 User connected:", socket.id);
    
    const userId = socket.handshake.query.userId;
    
    if (userId && userId !== "undefined") {
      onlineUsers.set(userId, socket.id);
      console.log(`✅ User ${userId} is now online`);
      
      // Broadcast online users
      io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
    }
    
    socket.on("disconnect", () => {
      console.log("👋 User disconnected:", socket.id);
      
      if (userId) {
        onlineUsers.delete(userId);
        console.log(`🔴 User ${userId} is now offline`);
        
        // Broadcast updated online users
        io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
      }
    });
  });
  
  return server;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  return io;
};

export const getReceiverSocketId = (userId) => {
  return onlineUsers.get(userId);
};

export const getOnlineUsers = () => {
  return Array.from(onlineUsers.keys());
};
