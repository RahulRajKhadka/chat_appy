import cloudinary from "../lib/cloudinary.js";
import Message from "../Models/Message.js";
import User from "../Models/User.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return res.status(200).json({ users: filteredUsers });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMessageByUserId = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { id: userToChatWith } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId, receiverId: userToChatWith },
        { senderId: userToChatWith, receiverId: loggedInUserId },
      ],
    }).sort({ createdAt: 1 });
    
    return res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    res.status(201).json({ message: newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getChatpartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId },
        { receiverId: loggedInUserId }
      ]
    }).sort({ createdAt: -1 });

    const userIds = new Set();
    messages.forEach(message => {
      if (message.senderId.toString() !== loggedInUserId.toString()) {
        userIds.add(message.senderId.toString());
      }
      if (message.receiverId.toString() !== loggedInUserId.toString()) {
        userIds.add(message.receiverId.toString());
      }
    });

    const chatPartners = await User.find({
      _id: { $in: Array.from(userIds) }
    }).select("-password");

    const chatPartnersWithLastMessage = await Promise.all(
      chatPartners.map(async (partner) => {
        const lastMessage = await Message.findOne({
          $or: [
            { senderId: loggedInUserId, receiverId: partner._id },
            { senderId: partner._id, receiverId: loggedInUserId }
          ]
        }).sort({ createdAt: -1 });

        return {
          ...partner.toObject(),
          lastMessage: lastMessage ? {
            text: lastMessage.text,
            image: lastMessage.image,
            createdAt: lastMessage.createdAt
          } : null
        };
      })
    );

    chatPartnersWithLastMessage.sort((a, b) => {
      const timeA = a.lastMessage ? new Date(a.lastMessage.createdAt) : new Date(0);
      const timeB = b.lastMessage ? new Date(b.lastMessage.createdAt) : new Date(0);
      return timeB - timeA;
    });

    return res.status(200).json({ chatPartners: chatPartnersWithLastMessage });
  } catch (error) {
    console.error("Error fetching chat partners:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
