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
import { Menu, X } from "lucide-react";

function ChatPage() {
  const { 
    activeTab, 
    selectedUser, 
    getChatPartners, 
    subscribeToMessages,
    unsubscribeFromMessages,
    setSelectedUser
  } = useChatStore();
  
  const { authUser } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when a user is selected on mobile
  useEffect(() => {
    if (isMobile && selectedUser) {
      setIsSidebarOpen(false);
    }
  }, [selectedUser, isMobile]);

  useEffect(() => {
    if (authUser) getChatPartners();
  }, [getChatPartners, authUser]);

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [subscribeToMessages, unsubscribeFromMessages]);

  const handleBackToChats = () => {
    setSelectedUser(null);
    if (isMobile) {
      setIsSidebarOpen(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-slate-700/40 bg-slate-800/40 backdrop-blur-md md:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="text-lg font-semibold">Messages</h1>
          <div className="w-10"> {/* Spacer for balance */}
            {selectedUser && (
              <button
                onClick={handleBackToChats}
                className="text-sm text-cyan-400 hover:text-cyan-300"
              >
                Back
              </button>
            )}
          </div>
        </div>
      )}

      <div className="flex h-[calc(100vh-64px)] md:h-screen">
        {/* Sidebar Overlay for Mobile */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* LEFT SIDEBAR */}
        <div className={`
          fixed md:relative z-50 md:z-auto
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          w-80 max-w-[90vw] md:max-w-none md:w-80
          h-full
          bg-slate-800/40 backdrop-blur-md flex flex-col border-r border-slate-700/30
        `}>
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
        <div className={`
          flex-1 flex flex-col bg-slate-900/50 backdrop-blur-lg
          ${isMobile && !selectedUser ? 'hidden md:flex' : 'flex'}
        `}>
          {selectedUser ? (
            <ChatContainer onBack={isMobile ? handleBackToChats : null} />
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;