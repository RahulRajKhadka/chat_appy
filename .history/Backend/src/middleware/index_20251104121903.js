mport express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ENV } from "../lib/env.js";

export const applyMiddleware = (app) => {
  // Body parser
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));
  
  // CORS
  app.use(
    cors({
      origin: ENV.CLIENT_URL || "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  
  // Cookie parser
  app.use(cookieParser());
  
  // Request logging (optional)
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
};
