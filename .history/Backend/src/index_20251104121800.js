import express from "express";
import dotenv from "dotenv";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { initializeSocket } from "./lib/socket.js";
import { applyMiddleware } from "./middleware/index.js";
import { registerRoutes } from "./routes/index.js";

dotenv.config();

const PORT = ENV.PORT || 3000;
const app = express();

// Apply middleware
applyMiddleware(app);

// Register routes
registerRoutes(app);

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Create HTTP server and initialize Socket.IO
    const server = initializeSocket(app);
    
    // Start listening
    server.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
      console.log(`🔌 Socket.IO is ready for connections`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
