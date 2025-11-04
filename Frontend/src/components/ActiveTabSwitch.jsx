import { useChatStore } from "../store/useChatStore";
import { FaComments, FaUserFriends } from "react-icons/fa";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="flex items-center justify-center gap-4 p-3 bg-slate-800/40 rounded-xl w-full max-w-sm mx-auto">
      {/* Chats Tab */}
      <button
        onClick={() => setActiveTab("chats")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 
          ${
            activeTab === "chats"
              ? "bg-cyan-500/20 text-cyan-400 font-semibold"
              : "text-slate-400 hover:text-cyan-300 hover:bg-slate-700/40"
          }`}
      >
        <FaComments className="text-lg" />
        Chats
      </button>

      {/* Contacts Tab */}
      <button
        onClick={() => setActiveTab("contacts")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 
          ${
            activeTab === "contacts"
              ? "bg-cyan-500/20 text-cyan-400 font-semibold"
              : "text-slate-400 hover:text-cyan-300 hover:bg-slate-700/40"
          }`}
      >
        <FaUserFriends className="text-lg" />
        Contacts
      </button>
    </div>
  );
}

export default ActiveTabSwitch;
