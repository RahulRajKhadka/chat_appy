import express from "express";
import {
  getAllContacts,
  getMessageByUserId,
  sendMessage
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/contacts", protectRoute, getAllContacts);
router.get("/chats",getChatpartners)
router.get("/:id", getMessageByUserId);
router.post("/send/:id", protectRoute, sendMessage);

// router.post("/send/:id",sendMessageToUser)

export default router;
