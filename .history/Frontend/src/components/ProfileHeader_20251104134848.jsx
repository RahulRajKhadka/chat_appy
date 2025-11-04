import { Camera, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import ProfileUpdateModal from "./ProfileUpdateModal";

function ProfileHeader() {
  const { authUser, logout, onlineUsers } = useAuthStore();
  const [showModal, setShowModal] = useState(false);

  const isOnline = onlineUsers.includes(authUser?._id);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <>
      <div className="w-full p-2 rounded-lg border-b border-green-400">
        <div className="flex items-center gap-4 justify-between">
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={authUser?.profilePic || "/avatar.png"}
                alt={authUser?.fullName || "Profile"}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-slate-600 shadow-lg"
              />

              {/* Camera Button */}
              <button
                onClick={() => setShowModal(true)}
                className="absolute -bottom-1 -right-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white p-1.5 sm:p-2 rounded-full shadow-lg border-2 border-slate-800 transition-all duration-200 hover:scale-110"
              >
                <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* User Details */}
            <div className="flex flex-col">
              <h2 className="text-base sm:text-lg font-semibold text-slate-100 leading-tight">
                {authUser?.fullName || "Guest User"}
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full border border-slate-700 ${
                      isOnline ? "bg-green-500 animate-pulse" : "bg-gray-500"
                    }`}
                  />
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-2 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white rounded-lg border border-slate-600/50 transition-all duration-200 hover:scale-105"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:block">Logout</span>
          </button>
        </div>
      </div>

     
      {showModal && (
        <ProfileUpdateModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default ProfileHeader;
