import { useEffect } from "react";
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white p-2 sm:p-4">
      <div className="relative w-full max-w-7xl h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)] lg:h-[800px] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl border border-slate-700/40 backdrop-blur-xl">
        <div className="flex h-full">
          {/* LEFT SIDEBAR - Responsive */}
          <div className={`${
            showSidebar ? 'w-full' : 'w-0'
          } ${selectedUser ? 'hidden' : 'flex'} sm:flex sm:w-64 md:w-72 lg:w-80 bg-slate-800/40 backdrop-blur-md flex-col border-r border-slate-700/30 transition-all duration-300`}>
            <div className="px-2 sm:px-3 lg:px-4 py-3 sm:py-4 border-b border-slate-700/30">
              <ProfileHeader onToggleSidebar={() => setShowSidebar(!showSidebar)} />
            </div>

            <div className="px-2 sm:px-3 lg:px-4 py-2">
              <ActiveTabSwitch activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            <div className="flex-1 overflow-y-auto px-2 sm:px-3 lg:px-4 py-2 sm:py-3 space-y-1 sm:space-y-2">
              {activeTab === "chats" ? (
                mockChatStore.chatPartners.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    onClick={() => setSelectedUser(user)}
                    showLastMessage={true}
                  />
                ))
              ) : (
                mockChatStore.contacts.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    onClick={() => setSelectedUser(user)}
                  />
                ))
              )}
            </div>
          </div>

          {/* RIGHT CHAT AREA - Responsive */}
          <div className={`${
            selectedUser ? 'flex' : 'hidden'
          } sm:flex flex-1 flex-col bg-slate-900/50 backdrop-blur-lg`}>
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center gap-3 p-3 sm:p-4 border-b border-slate-700/50 bg-slate-800/30">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="sm:hidden text-slate-400 hover:text-slate-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <img
                    src={selectedUser.profilePic}
                    alt={selectedUser.fullName}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-200 truncate">
                      {selectedUser.fullName}
                    </h3>
                    <p className="text-xs sm:text-sm text-green-400">Online</p>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                  <div className="flex items-center justify-center h-full text-slate-400 text-sm sm:text-base">
                    No messages yet. Start the conversation!
                  </div>
                </div>

                {/* Message Input */}
                <MessageInput />
              </>
            ) : (
              <div className="hidden sm:flex flex-1 items-center justify-center">
                <div className="text-center text-slate-400 px-4">
                  <MessageSquare className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">No Conversation Selected</h3>
                  <p className="text-sm sm:text-base">Choose a chat or contact to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
}

export default ChatPage;
