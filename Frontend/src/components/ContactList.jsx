import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { allContacts, setSelectedUser, selectedUser, isLoadingContacts } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  if (isLoadingContacts) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (allContacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 p-4">
        <svg
          className="w-16 h-16 mb-4 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <p className="font-medium">No contacts available</p>
        <p className="text-sm mt-2 text-center">
          Contacts will appear here once other users sign up
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {allContacts.map((contact) => {
        const isOnline = onlineUsers.includes(contact._id);
        const isSelected = selectedUser?._id === contact._id;

        return (
          <button
            key={contact._id}
            onClick={() => setSelectedUser(contact)}
            className={`
              w-full p-3 rounded-lg transition-all duration-200 relative
              ${
                isSelected
                  ? "bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-500/50 shadow-lg"
                  : "bg-slate-700/30 hover:bg-slate-700/50 border border-transparent hover:border-slate-600/50"
              }
            `}
          >
            <div className="flex items-center gap-3">
             
              <div className="relative flex-shrink-0">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-600"
                />
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full animate-pulse"></span>
                )}
              </div>

              {/* Contact Info */}
              <div className="flex-1 text-left min-w-0">
                <h3 className="font-medium text-slate-100 truncate">
                  {contact.fullName}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs text-slate-400">
                    {contact.email}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span
                    className={`text-xs font-medium ${
                      isOnline ? "text-green-400" : "text-slate-500"
                    }`}
                  >
                    {isOnline ? "● Online" : "○ Offline"}
                  </span>
                </div>
              </div>

             
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default ContactList;