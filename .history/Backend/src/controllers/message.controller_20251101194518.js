import Message from "../Models/Message.js";
import User from "../Models/User.js";


export const getAllContacts=async(req,res)=>{
    try {
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        return res.status(200).json({users:filteredUsers});
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return res.status(500).json({message:"Server error"});
    }

};

export const getMessageByUserId=async(req,res)=>{
    try {
        const loggedInUserId=req.user._id;
        const{Id:userToChatWith}:r
        const messages=await Message.find({
            $or:[
                {sender:loggedInUserId,receiver:otherUserId},
                {sender:otherUserId,receiver:loggedInUserId}
            ]
        }).sort({createdAt:1});
        return res.status(200).json({messages});
    } catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({message:"Server error"});
    }

};
