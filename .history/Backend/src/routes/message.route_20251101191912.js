import express from 'express';
import { getAllContacts } from '../controllers/message.controller.js';


const router = express.Router();

router.get("/contacts",protec getAllContacts);
// router.get("/chats",getChatpartners)
// router.get("/:id",getMessageByUserId)

// router.post("/send/:id",sendMessageToUser)


export default router;
