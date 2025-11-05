import React from "react";

function NotificationBadge({ count, className = "" }) {
  if (!count || count === 0) return null;

  const displayCount = count > 99 ? "99+" : count;

  return (
    <span
      className={`
        absolute -top-1 -right-1 
        bg-red-500 text-white 
        text-xs font-bold 
        rounded-full 
        min-w-[18px] h-[18px] 
        flex items-center justify-center 
        px-1
        shadow-lg
        animate-pulse
        ${className}
      `}
    >
      {displayCount}
    </span>
  );
}

export default NotificationBadge;