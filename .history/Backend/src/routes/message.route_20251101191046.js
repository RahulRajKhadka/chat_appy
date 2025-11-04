import express from 'express';


const router = express.Router();

router.get("/contacts", getAllContacts);
router.get("/chats",getChatpartners)
router.get("/:id",getMessageByUserId)

router.post("/send/")


export default router;
