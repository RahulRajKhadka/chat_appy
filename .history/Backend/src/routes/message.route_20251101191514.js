import express from 'express';
import { getAllContacts, 


const router = express.Router();

router.get("/contacts", getAllContacts);
router.get("/chats",getChatpartners)
router.get("/:id",getMessageByUserId)

router.post("/send/:id",sendMessageToUser)


export default router;
