import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatList from "../components/ChatList.jsx";
import ContactList from "../components/ContactList.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import NoConversationPlaceholder from "../components/NoConversationPlaceHolder";

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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white p-4">
      <div className="relative w-full max-w-6xl h-[800px] rounded-3xl overflow-hidden shadow-xl border border-slate-700/40 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:border-slate-500/40">
        <BorderAnimatedContainer>
          <div className="flex h-full">
            {/* LEFT SIDEBAR */}
            <div className="w-80 bg-slate-800/40 backdrop-blur-md flex flex-col border-r border-slate-700/30">
              <div className="px-4 py-4 border-b border-slate-700/30">
                <ProfileHeader />
              </div>

              <div className="px-4 py-2">
                <ActiveTabSwitch />
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/20">
                {activeTab === "chats" ? <ChatList /> : <ContactList />}
              </div>
            </div>

            {/* RIGHT CHAT AREA */}
            <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-lg">
              {selectedUser ? (
                <ChatContainer />
              ) : (
                <NoConversationPlaceholder />
              )}
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default ChatPage;
