import { resolveContent } from "nodemailer/lib/shared/index.js";
import cloudinary from "../lib/cloudinary.js";
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

        const {id:userToChatWith}=req.params;
       
        const messages=await Message.find({
            $or:[
                {sender:loggedInUserId,receiver:userToChatWith},
                {sender:userToChatWith,receiver:loggedInUserId}
            ]
        }).sort({createdAt:1});
        return res.status(200).json({messages});


    } catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({message:"Server error"});
    }

};


export const sendMessage=async(req,res)=>{

try {
    const {text,image}=req.body;
const {id:receiverId}=req.params;
const senderId=req.user._id;

let imageUrl;
if(image){
    // In a real application, you would handle image upload to a storage service here.
    const uploadResponse=await cloudinary.uploader.upload(image);
    imageUrl=uploadResponse.secure_url;     

}

const newMessage=new Message({
    sender:senderId,
    receiver:receiverId,
    text,
    image:imageUrl
});

await newMessage.save();

res.status(201).json({message:newMessage});
}catch (error){

    console.error('Error sending message:', error);
};
)

