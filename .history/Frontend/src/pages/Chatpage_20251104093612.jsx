import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceHolder";
import { motion } from "framer-motion";

function ChatPage() {
  const { 
    activeTab, 
    selectedUser, 
    getChatPartners, 
    subscribeToMessages,
    unsubscribeFromMessages 
  } = useChatStore();
  
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser) getChatPartners();
  }, [getChatPartners, authUser]);

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [subscribeToMessages, unsubscribeFromMessages]);

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-6xl h-[800px] rounded-3xl overflow-hidden shadow-2xl border border-slate-700/30 backdrop-blur-lg"
      >
        <BorderAnimatedContainer>
          <div className="flex h-full">
            {/* LEFT SIDEBAR */}
            <div className="w-80 bg-slate-800/40 backdrop-blur-md flex flex-col border-r border-slate-700/30">
              <div className="px-4 py-3 border-b border-slate-700/30">
                <ProfileHeader />
              </div>

              <div className="px-4 py-2">
                <ActiveTabSwitch />
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/20">
                {activeTab === "chats" ? <ChatList /> : <ContactList />}
              </div>
            </div>

            {/* RIGHT CHAT AREA */}
            <div className="flex-1 flex flex-col bg-slate-900/60 backdrop-blur-md relative">
              {selectedUser ? (
                <ChatContainer />
              ) : (
                <NoConversationPlaceholder />
              )}
            </div>
          </div>
        </BorderAnimatedContainer>
      </motion.div>
    </div>
  );
}

export default ChatPage;
