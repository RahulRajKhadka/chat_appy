import { Camera, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import ProfileUpdateModal from "./ProfileUpdateModal";

function ProfileHeader() {
  const { authUser, logout } = useAuthStore();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <>
      <div className="bg-slate-800/50 border-b border-slate-700/50 p-6">
        <div className="flex flex-col items-center gap-4">
          {/* Profile Picture with Edit Button and Online Status */}
          <div className="relative">
            {/* Online Status Indicator */}
            <div className="avatar online">
              <div className="w-24 rounded-full ring-2 ring-slate-700">
                <img
                  src={authUser?.profilePic || "/avatar.png"}
                  alt={authUser?.fullName || "Profile"}
                />
              </div>
            </div>
            
            {/* Camera Icon Button */}
            <button
              onClick={() => setShowModal(true)}
              className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors shadow-lg"
              aria-label="Update profile picture"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* User Info */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-slate-200">
              {authUser?.fullName}
            </h2>
            <p className="text-sm text-slate-400">{authUser?.email}</p>
            <p className="text-xs text-green-400 mt-1 flex items-center justify-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Online
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 py-2 px-4 rounded-lg transition-all border border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Profile Update Modal */}
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