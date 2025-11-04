import express from "express";
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createRateLimitMiddleware } from "../middleware/rateLimit.middleware.js";
import { authSignupRateLimit, authLoginRateLimit } from "../lib/arcjet.js";

const router = express.Router();

router.post("/signup", createRateLimitMiddleware(authSignupRateLimit), signup);
router.post("/login", createRateLimitMiddleware(authLoginRateLimit), login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;