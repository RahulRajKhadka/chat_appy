import { MessageCircle, Users } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import NotificationBadge from "./NotificationBadge";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab, totalUnreadCount, allContacts } = useChatStore();

  return (
    <div className="flex gap-2 p-1 bg-slate-700/30 rounded-lg">
      <button
        onClick={() => setActiveTab("chats")}
        className={`
          flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md
          transition-all duration-200 font-medium relative
          ${
            activeTab === "chats"
              ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/20"
              : "text-slate-300 hover:bg-slate-600/30"
          }
        `}
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5" />
          <NotificationBadge count={totalUnreadCount} />
        </div>
        <span className="hidden sm:inline">Chats</span>
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`
          flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md
          transition-all duration-200 font-medium relative
          ${
            activeTab === "contacts"
              ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/20"
              : "text-slate-300 hover:bg-slate-600/30"
          }
        `}
      >
        <div className="relative">
          <Users className="w-5 h-5" />
          <NotificationBadge 
            count={allContacts.length} 
            className="bg-blue-500"
          />
        </div>
        <span className="hidden sm:inline">Contacts</span>
      </button>
    </div>
  );
}

export default ActiveTabSwitch;