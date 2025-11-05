import Message from "../Models/Message.js";
import User from "../Models/User.js";
import { uploadToCloudinary } from "../lib/cloudinary.js";
import { getIO, getReceiverSocketId } from "../lib/socket.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return res.status(200).json({ contacts: filteredUsers });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMessageByUserId = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { id: userToChatWith } = req.params;

    // Mark messages from that user as read
    await Message.updateMany(
      { senderId: userToChatWith, receiverId: loggedInUserId, isRead: false },
      { $set: { isRead: true } }
    );

    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId, receiverId: userToChatWith },
        { senderId: userToChatWith, receiverId: loggedInUserId },
      ],
    }).sort({ createdAt: 1 });

    // Emit unread count update to both users
    const io = getIO();
    const totalUnreadCount = await Message.countDocuments({
      receiverId: loggedInUserId,
      isRead: false,
    });
    
    const senderSocketId = getReceiverSocketId(loggedInUserId.toString());
    if (senderSocketId) {
      io.to(senderSocketId).emit("unreadCountUpdate", totalUnreadCount);
    }

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

    if (!text && !image) {
      return res.status(400).json({
        message: "Message must contain text or image",
      });
    }

    let imageUrl = null;

    if (image) {
      const uploadResult = await uploadToCloudinary(image, "chat-messages");
      imageUrl = uploadResult.url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text: text || "",
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    const io = getIO();
    
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log(`📨 Message sent to user ${receiverId} via socket`);
      
      // Send updated unread count to receiver
      const unreadCount = await Message.countDocuments({
        receiverId: receiverId,
        isRead: false,
      });
      io.to(receiverSocketId).emit("unreadCountUpdate", unreadCount);
    }

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
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    }).sort({ createdAt: -1 });

    const userIds = new Set();
    messages.forEach((message) => {
      if (message.senderId.toString() !== loggedInUserId.toString()) {
        userIds.add(message.senderId.toString());
      }
      if (message.receiverId.toString() !== loggedInUserId.toString()) {
        userIds.add(message.receiverId.toString());
      }
    });

    const chatPartners = await User.find({
      _id: { $in: Array.from(userIds) },
    }).select("-password");

    const chatPartnersWithLastMessage = await Promise.all(
      chatPartners.map(async (partner) => {
        const lastMessage = await Message.findOne({
          $or: [
            { senderId: loggedInUserId, receiverId: partner._id },
            { senderId: partner._id, receiverId: loggedInUserId },
          ],
        }).sort({ createdAt: -1 });

        const unreadCount = await Message.countDocuments({
          senderId: partner._id,
          receiverId: loggedInUserId,
          isRead: false,
        });

        return {
          ...partner.toObject(),
          lastMessage: lastMessage
            ? {
                text: lastMessage.text,
                image: lastMessage.image,
                createdAt: lastMessage.createdAt,
              }
            : null,
          unreadCount,
        };
      })
    );

    chatPartnersWithLastMessage.sort((a, b) => {
      const timeA = a.lastMessage
        ? new Date(a.lastMessage.createdAt)
        : new Date(0);
      const timeB = b.lastMessage
        ? new Date(b.lastMessage.createdAt)
        : new Date(0);
      return timeB - timeA;
    });

    return res.status(200).json({ chatPartners: chatPartnersWithLastMessage });
  } catch (error) {
    console.error("Error fetching chat partners:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    
    const unreadCount = await Message.countDocuments({
      receiverId: loggedInUserId,
      isRead: false,
    });

    return res.status(200).json({ unreadCount });
  } catch (error) {
    console.error("Error fetching unread count:", error);
    return res.status(500).json({ message: "Server error" });
  }
};