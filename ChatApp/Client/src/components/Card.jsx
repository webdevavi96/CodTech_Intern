import React from "react";

function Card({ name, message, time, avatar, variant }) {
  const variants = {
    default: "bg-[#8FA9C4] text-gray-900",
    active: "bg-[#0F5C4D] text-white",
    muted: "bg-[#E5E5E5] text-gray-900",
  };

  const timeColors = {
    default: "text-green-800",
    active: "text-[#00FFB3]",
    muted: "text-gray-600",
  };

  return (
    <div
      className={`flex w-full max-w-md items-center justify-between rounded-full px-4 py-3 shadow-sm ${variants[variant]}`}
    >
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt="profile"
          className="h-12 w-12 rounded-full border-2 border-white object-cover"
        />

        <div>
          <h2 className="text-sm font-semibold">{name}</h2>
          <p className="text-xs opacity-90">{message}</p>
        </div>
      </div>

      <span className={`text-xs font-medium ${timeColors[variant]}`}>{time}</span>
    </div>
  );
}

export default Card;
