import express from 'express';


const router = express.Router();

router.get("/contacts", getAllContacts);
router.get("/chats",getChatpartners)
router.get("/:id",getMessageByUserId)




export default router;
