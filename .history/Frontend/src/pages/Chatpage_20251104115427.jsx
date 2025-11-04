import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ActiveTabSwitch from "../components/ActiveTabSwitch.jsx";
import ChatList from "../components/ChatList.jsx";
import ContactList from "../components/ContactList.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import NoConversationPlaceholder from "../components/NoConversationPlaceHolder.jsx";

function ChatPage() {
  const {
    activeTab,
    selectedUser,
    getChatPartners,
    subscribeToMessages,
    unsubscribeFromMessages,
    setSelectedUser,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const [isMobile, setIsMobile] = useState(false);

 
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (authUser) getChatPartners();
  }, [getChatPartners, authUser]);

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [subscribeToMessages, unsubscribeFromMessages]);

  const handleBackToChats = () => {
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-slate-700/40 bg-slate-800/40 backdrop-blur-md md:hidden">
          <div className="flex items-center gap-3">
            {selectedUser && (
              <button
                onClick={handleBackToChats}
                className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            <h1 className="text-lg font-semibold">
              {selectedUser ? selectedUser.displayName : "Messages"}
            </h1>
          </div>

          {!selectedUser && (
            <div className="flex items-center gap-2">
              <ProfileHeader />
            </div>
          )}
        </div>
      )}

      <div className="flex h-[calc(100vh-64px)] md:h-screen">
   
        {!isMobile || !selectedUser ? (
          <div
            className={`
            ${isMobile ? "w-full" : "w-80"}
            bg-slate-800/40 backdrop-blur-md flex flex-col border-r border-slate-700/30
          `}
          >
            {/* Desktop Profile Header */}
            {!isMobile && (
              <div className="px-4 py-4 border-b border-slate-700/30">
                <ProfileHeader />
              </div>
            )}

            <div className="px-4 py-2">
              <ActiveTabSwitch />
            </div>

            
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/20">
              {activeTab === "chats" ? <ChatList /> : <ContactList />}
            </div>
          </div>
        ) : null}

        {/* Chat Area */}
        <div
          className={`
          flex-1 flex flex-col bg-slate-900/50 backdrop-blur-lg
          ${isMobile && !selectedUser ? "hidden" : "flex"}
        `}
        >
          {selectedUser ? (
            <ChatContainer onBack={isMobile ? handleBackToChats : null} />
          ) : isMobile ? null : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
