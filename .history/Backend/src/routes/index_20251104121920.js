import authRoute from "./auth.route.js";
import messageRoute from "./message.route.js";

export const registerRoutes = (app) => {
  // Health check
  app.get("/health", (req, res) => {
    res.status(200).json({ 
      status: "ok", 
      message: "Server is healthy",
      timestamp: new Date().toISOString()
    });
  });
  
  // API routes
  app.use("/api/auth", authRoute);
  app.use("/api/messages", messageRoute);
  
  // 404 handler
  app.use("*", (req, res) => {
    res.status(404).json({ 
      success: false,
      message: "Route not found" 
    });
  });
  
  // Global error handler
  app.use((err, req, res, next) => {
    console.error("❌ Error:", err);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  });
};
