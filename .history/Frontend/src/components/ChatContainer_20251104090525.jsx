import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessagesLoadingSkeleton from  "./MessageLoadingSkeleton"
import 

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isLoadingMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // Fetch messages when user is selected and subscribe to real-time updates
  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
      subscribeToMessages();
    }
    
    // Cleanup: unsubscribe when component unmounts or user changes
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messageEndRef.current && messages[selectedUser?._id]) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedUser?._id]);

  // Get messages for the selected user
  const userMessages = selectedUser?._id ? messages[selectedUser._id] || [] : [];

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {userMessages.length > 0 && !isLoadingMessages ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {userMessages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${
                  msg.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble relative ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.image && (
                    <img 
                      src={msg.image} 
                      alt="Shared" 
                      className="rounded-lg max-h-48 object-cover mb-2" 
                    />
                  )}
                  {msg.text && <p>{msg.text}</p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {/* Scroll target */}
            <div ref={messageEndRef} />
          </div>
        ) : isLoadingMessages ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser?.fullName} />
        )}
      </div>
      
      <MessageInput />
    </div>
  );
}

export default ChatContainer;