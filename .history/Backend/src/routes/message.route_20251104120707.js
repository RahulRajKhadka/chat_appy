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
import 

const router = express.Router();


router.get(
  "/contacts",
  protectRoute,
  createRateLimitMiddleware(fetchContactsRateLimit),
  getAllContacts
);


router.get(
  "/chats",
  protectRoute,
  createRateLimitMiddleware(fetchMessagesRateLimit),
  getChatpartners
);


router.get(
  "/:id",
  protectRoute,
  createRateLimitMiddleware(fetchMessagesRateLimit),
  getMessageByUserId
);


router.post(
  "/send/:id",
  protectRoute,
  createRateLimitMiddleware(messageRateLimit),
  sendMessage
);

export default router;