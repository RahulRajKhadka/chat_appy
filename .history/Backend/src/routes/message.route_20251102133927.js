import express from "express";
import {
  getAllContacts,
  getMessageByUserId,
  sendMessage,
  getChatpartners
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createRateLimitMiddleware } from "../middleware/rateLimit.middleware.js";
import {
  messageRateLimit,
  fetchContactsRateLimit,
  fetchMessagesRateLimit,
} from "../lib/arcjet.js";

const router = express.Router();

// Get all users (contacts)
router.get(
  "/contacts",
  protectRoute,
  createRateLimitMiddleware(fetchContactsRateLimit),
  getAllContacts
);

// Get users you've chatted with
router.get(
  "/chats",
  protectRoute,
  createRateLimitMiddleware(fetchMessagesRateLimit),
  getChatpartners
);

// Get messages with a specific user
router.get(
  "/:id",
  protectRoute,
  createRateLimitMiddleware(fetchMessagesRateLimit),
  getMessageByUserId
);

// Send a message
router.post(
  "/send/:id",
  protectRoute,
  createRateLimitMiddleware(messageRateLimit),
  sendMessage
);

export default router;