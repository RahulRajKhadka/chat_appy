import dotenv from "dotenv";
import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { initializeSocket } from "./lib/socket.js";
import { setupMiddleware } from "./config/middleware.js";
import { setupRoutes } from "./config/routes.js";

dotenv.config();

const app = express();
const PORT = ENV.PORT || 3000;

setupMiddleware(app);
setupRoutes(app);

const startServer = async () => {
  await connectDB();
  const server = initializeSocket(app);
  server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
};

startServer();