// server.js
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { ENV } from "./lib/env.js";
import { connectDatabase } from "./config/database.js";
import { corsConfig } from "./config/cors.js";
import { setupMiddleware } from "./middleware/index.js";
import { setupRoutes } from "./routes/index.js";
import { app, server } from "./socket.js"; // This should work if socket.js is in same directory

dotenv.config();

const PORT = ENV.PORT || 3000;

// Setup middleware and CORS
app.use(corsConfig);
setupMiddleware(app);

// Setup routes
setupRoutes(app);

// Start server
async function startServer() {
  try {
    await connectDatabase();
    
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`🔌 Socket.IO is ready for connections`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();