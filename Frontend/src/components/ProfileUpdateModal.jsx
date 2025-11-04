import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Camera, X, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

function ProfileUpdateModal({ isOpen, onClose }) {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = async () => {
    if (!selectedImage) {
      toast.error("Please select an image");
      return;
    }

    try {
      await updateProfile(selectedImage);
      onClose();
      setSelectedImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  const handleClose = () => {
    setSelectedImage(null);
    setImagePreview(null);
    onClose();
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                   z-[10000] w-[90vw] max-w-sm bg-slate-800 rounded-2xl shadow-2xl
                   border border-slate-700 p-6"
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-full hover:bg-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-slate-200 mb-6 text-center">
          Update Profile Picture
        </h2>

        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-cyan-500/30 bg-slate-700">
              <img
                src={imagePreview || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 bg-cyan-500 hover:bg-cyan-600 
                         text-white p-2 rounded-full shadow-lg border-2 border-slate-800
                         transition-all duration-200 hover:scale-110
                         disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isUpdatingProfile}
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />

          <div className="text-center">
            <p className="text-slate-300 text-sm mb-1">Choose a new profile picture</p>
            <p className="text-slate-500 text-xs">Supported: JPG, PNG, WebP</p>
            <p className="text-slate-500 text-xs">Max size: 5MB</p>
          </div>

          <div className="flex gap-3 w-full">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors font-medium"
              disabled={isUpdatingProfile}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateProfile}
              disabled={!selectedImage || isUpdatingProfile}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 
                         hover:from-cyan-600 hover:to-cyan-700 text-white rounded-lg 
                         font-medium transition-all disabled:opacity-50 flex items-center 
                         justify-center gap-2"
            >
              {isUpdatingProfile ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

export default ProfileUpdateModal;
