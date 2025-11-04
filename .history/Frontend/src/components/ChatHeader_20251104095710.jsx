import { LogOut, Settings, Volume2, VolumeX, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useState } from "react";
import ProfileUpdateModal from "./ProfileUpdateModal";

function ProfileHeader() {
  const { authUser, logout } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [showMenu, setShowMenu] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="p-4 border-b border-slate-700/50 bg-slate-800/30">
      <div className="flex items-center justify-between">
        {/* Left section: Profile info */}
        <div className="flex items-center gap-3">
          {/* Profile Picture (Clickable) */}
          <div
            className="avatar online cursor-pointer hover:opacity-80 transition-opacity"
            title="Click to update profile"
            onClick={() => setIsProfileModalOpen(true)}
          >
            <div className="w-12 h-12 rounded-full">
              <img
                src={authUser?.profilePic || "/avatar.png"}
                alt={authUser?.fullName}
                className="object-cover"
              />
            </div>
          </div>

          {/* User Info */}
          <div>
            <h3 className="text-slate-200 font-medium">
              {authUser?.fullName || "User"}
            </h3>
            <p className="text-xs text-slate-400">Online</p>
          </div>
        </div>

        {/* Right section: buttons */}
        <div className="flex items-center gap-2">
          {/* Sound toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-colors"
            title={isSoundEnabled ? "Mute notifications" : "Unmute notifications"}
          >
            {isSoundEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>

          {/* Settings dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
                {/* Update profile option */}
                <button
                  onClick={() => {
                    setIsProfileModalOpen(true);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-slate-200 hover:bg-slate-700/50 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Update Profile</span>
                </button>

                {/* Logout option */}
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-slate-200 hover:bg-slate-700/50 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close menu when clicking outside */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        ></div>
      )}

      {/* Profile update modal */}
      <ProfileUpdateModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
}

export default ProfileHeader;
