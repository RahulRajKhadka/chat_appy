// middleware/index.js
import express from "express";
import cookieParser from "cookie-parser";

export function setupMiddleware(app) {
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));
  app.use(cookieParser());
}