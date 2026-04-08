import React from 'react';
import { MdAddIcCall } from 'react-icons/md';

function CallerCard({ user, onClick = () => {} }) {
  return (
    <div className="flex w-full max-w-md items-center justify-between rounded-full bg-[#ADCCED] px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src={user?.avatar}
          alt="profile"
          className="h-12 w-12 rounded-full border-2 border-white object-cover"
        />

        <div>
          <h2 className="text-sm font-semibold">{user?.name}</h2>
          <p className="text-xs opacity-90">{user?.message}</p>
        </div>
      </div>
      <div className="flex items-center px-2">
        <button
          onClick={() => {
            onClick(user);
          }}
        >
          <MdAddIcCall color="#005451" />
        </button>
      </div>
    </div>
  );
}

export default CallerCard;
