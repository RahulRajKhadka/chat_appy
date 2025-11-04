import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessagesLoadingSkeleton from "./MessageLoadingSkeleton";
import MessageInput from "./MessageInput";
import { ArrowLeft } from "lucide-react";

function ChatContainer({ onBack }) {
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

  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages[selectedUser?._id]) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedUser?._id]);

  const userMessages = selectedUser?._id ? messages[selectedUser._id] || [] : [];

  return (
    <div className="flex flex-col h-full bg-slate-900/40 backdrop-blur-lg">
       <div className="relative">
       
        <ChatHeader />
      </div>

      <div className="flex-1 px-3 sm:px-4 md:px-6 py-4 md:py-6 overflow-y-auto space-y-4 md:space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {userMessages.length > 0 && !isLoadingMessages ? (
          <div className="max-w-3xl mx-auto w-full space-y-3 md:space-y-5">
            {userMessages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${
                  msg.senderId === authUser._id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] xs:max-w-[80%] sm:max-w-[75%] md:max-w-[70%] lg:max-w-[60%] px-3 py-2 md:px-4 md:py-3 rounded-2xl shadow-md break-words relative ${
                    msg.senderId === authUser._id
                      ? "bg-gradient-to-br from-cyan-600 to-cyan-700 text-white rounded-br-none"
                      : "bg-slate-800/80 text-slate-100 rounded-bl-none"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="rounded-lg max-h-30 md:max-h-40 w-full object-cover mb-2"
                    />
                  )}
                  {msg.text && <p className="leading-relaxed text-sm md:text-[10px]">{msg.text}</p>}
                  <p className=" mt-1 md:mt-2 text-[8px] opacity-70 text-right">
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        ) : isLoadingMessages ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser?.fullName} />
        )}
      </div>

      <div className="px-3 sm:px-4 md:px-6 py-3 md:py-4 border-t border-slate-800/50">
        <MessageInput />
      </div>
    </div>
  );
}

export default ChatContainer;