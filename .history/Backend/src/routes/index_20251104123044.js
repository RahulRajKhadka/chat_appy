import authRoute from "./auth.route.js";
import messageRoute from "./message.route.js";

export const registerRoutes = (app) => {
  // Health check
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });
  
  // API routes
  app.use("/api/auth", authRoute);
  app.use("/api/messages", messageRoute);
  
  // 404 handler - FIX THIS LINE
  app.use((req, res) => {  // ✅ Remove the "*"
    res.status(404).json({ 
      success: false,
      message: `Route ${req.originalUrl} not found` 
    });
  });
  
  // Error handler
  app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  });
};
