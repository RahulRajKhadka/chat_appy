// routes/index.js
import authRoute from "./auth.route.js";
import messageRoute from "./message.route.js";

export function setupRoutes(app) {
  app.use("/api/auth", authRoute);
  app.use("/api/messages", messageRoute);
}