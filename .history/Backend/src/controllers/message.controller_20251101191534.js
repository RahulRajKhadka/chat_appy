import Message from "../Models/Message";
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

export const getChatpartners=async(req,res)=>{

