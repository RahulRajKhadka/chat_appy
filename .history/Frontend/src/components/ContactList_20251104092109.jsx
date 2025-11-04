import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UserLoadingSkelenton"
import { useAuthStore } from "../store/useAuthStore";


function ContactList() {
  const { 
    getAllContacts, 
    allContacts, 
    isLoadingContacts, 
    setSelectedUser 
  } = useChatStore();
  
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isLoadingContacts) return <UsersLoadingSkeleton />;

  if (!allContacts || allContacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <div className="text-slate-400 mb-2">
          <svg
            className="w-16 h-16 mx-auto mb-4 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-lg font-medium">No contacts available</p>
          <p className="text-sm mt-1">Start by adding some users!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-slate-800/50 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors border border-slate-700/50 hover:border-cyan-500/50"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div
              className={`avatar ${
                onlineUsers?.includes(contact._id) ? "online" : "offline"
              }`}
            >
              <div className="w-12 h-12 rounded-full">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName || "User"}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-slate-200 font-medium truncate">
                {contact.fullName || "Unknown User"}
              </h4>
              <p className="text-xs text-slate-400 truncate">
                {contact.email || ""}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactList;