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
    if (authUser) {
      getChatPartners();
    }
  }, [getChatPartners, authUser]);

  
  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [subscribeToMessages, unsubscribeFromMessages]);

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900 min-h-screen">
      <div className="relative w-full max-w-6xl h-[800px]">
        <BorderAnimatedContainer>
          <div className="flex h-full">
            {/* LEFT SIDEBAR */}
            <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col border-r border-slate-700/50">
              <ProfileHeader />
              <ActiveTabSwitch />

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {activeTab === "chats" ? <ChatList /> : <ContactList />}
              </div>
            </div>

            {/* RIGHT CHAT AREA */}
            <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
              {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default ChatPage;