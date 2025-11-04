import express from "express";
import {
  getAllContacts,
  getMessageByUserId,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/contacts", protectRoute, getAllContacts);
// router.get("/chats",getChatpartners)
router.get("/:id", getMessageByUserId);
routere.post()

// router.post("/send/:id",sendMessageToUser)

export default router;
