import React, { useState, useEffect, useContext } from 'react';
import { Profile } from '../components/components.js';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from '../contexts/authContext.jsx';
import { logout } from '../auth/authReq.js';

function Settings() {
  const [isMobileUser, setIsMobileUser] = useState(false);
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    if (window.innerWidth < 1024) setIsMobileUser(true);
    else setIsMobileUser(false);
  });

  const handleClick = () => {
    navigate(window.history.back());
  };

  const handleLogout = async () => {
    const res = await logout(user);
    if (res.success) {
      logOut();
      navigate('/login');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#e1ecf7] p-6">
      {isMobileUser && (
        <div className="sticky top-0 z-10 flex items-center gap-3 bg-[#e1ecf7] py-2">
          <button onClick={handleClick} className="rounded-full p-2 transition hover:bg-gray-200">
            <FaArrowLeft className="text-gray-800" />
          </button>

          <span className="text-lg font-semibold text-gray-800">Settings</span>
        </div>
      )}
      {!isMobileUser && <h1 className="text-lg font-semibold text-gray-800">Settings</h1>}
      <div className="grid items-stretch gap-6 md:grid-cols-2">
        <div className="order-2 space-y-4 md:order-1">
          <details className="cursor-pointer rounded-2xl bg-[#009DFF] p-4 text-white shadow-sm">
            <summary className="text-lg font-semibold">
              Edit Profile
              <p className="text-sm text-blue-100">Name, Profile Photo, Bio</p>
            </summary>

            <div className="mt-3 space-y-2 text-sm">
              <button className="rounded bg-white px-3 py-1 text-[#009DFF]">Update Name</button>
              <button className="ml-2 rounded bg-white px-3 py-1 text-[#009DFF]">
                Change Photo
              </button>
            </div>
          </details>

          <details className="cursor-pointer rounded-2xl bg-[#FF0000] p-4 text-white shadow-sm">
            <summary className="text-lg font-semibold">
              Danger Zone
              <p className="text-sm text-red-100">Delete Profile, Log Out</p>
            </summary>

            <div className="mt-3 space-y-2 text-sm">
              <button className="rounded bg-white px-3 py-1 text-[#FF0000]">Delete Account</button>
              <button
                onClick={handleLogout}
                className="ml-2 rounded bg-white px-3 py-1 text-[#FF0000]"
              >
                Log Out
              </button>
            </div>
          </details>
        </div>
        <div className="order-1 flex min-h-96 flex-col justify-center rounded-2xl bg-[#111b21] p-6 shadow-sm md:order-2">
          <Profile user={user} />
        </div>
      </div>
    </div>
  );
}

export default Settings;
