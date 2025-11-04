import { Camera } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import ProfileUpdateModal from "./ProfileUpdateModal";

function ProfileHeader() {
  const { authUser } = useAuthStore();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-slate-800/50 border-b border-slate-700/50 p-6">
        <div className="flex flex-col items-center gap-4">
          {/* Profile Picture with Edit Button */}
          <div className="relative">
            <div className="avatar">
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
          </div>
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
