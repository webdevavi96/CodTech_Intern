import React from "react";

function Profile({ user }) {
  if (!user) {
    return <div className="text-gray-400">No user data available</div>;
  }

  const { username, fullname, email, avatar, bio } = user;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="flex flex-col items-center border-b border-gray-700 py-6">
        <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-gray-600">
          <img src={avatar} alt="profile" className="h-full w-full object-cover" />
        </div>

        <h2 className="mt-3 text-lg font-semibold text-white">{fullname}</h2>

        <p className="text-sm text-gray-400">@{username}</p>
      </div>

      <div className="flex flex-col divide-y divide-gray-700 text-sm">
        <div className="p-4 transition hover:bg-[#202c33]">
          <p className="mb-1 text-xs text-gray-400">Email</p>
          <p className="text-gray-100">{email}</p>
        </div>

        <div className="p-4 transition hover:bg-[#202c33]">
          <p className="mb-1 text-xs text-gray-400">Bio</p>
          <p className="text-gray-200">{bio || "No bio added"}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
