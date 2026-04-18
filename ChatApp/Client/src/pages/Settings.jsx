import React, { useState, useEffect, useContext } from "react";
import { Profile } from "../components/components.js";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AuthContext } from "../contexts/authContext.jsx";
import { logout } from "../auth/authReq.js";

function Settings() {
  const [isMobileUser, setIsMobileUser] = useState(false);
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileUser(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    navigate(-1);
  };

  const handleLogout = async () => {
    const res = await logout(user);
    if (res.success) {
      logOut();
      navigate("/login");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#e1ecf7] p-4 md:p-6">
      {/* Header */}
      {isMobileUser ? (
        <div className="sticky top-0 z-10 flex items-center gap-3 bg-[#e1ecf7] py-2">
          <button onClick={handleClick} className="rounded-full p-2 hover:bg-gray-200">
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold text-gray-800">Settings</span>
        </div>
      ) : (
        <h1 className="mb-4 text-xl font-semibold text-gray-800">Account Settings</h1>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* LEFT PANEL */}
        <div className="order-2 space-y-6 md:order-1">
          {/* PROFILE SETTINGS */}
          <div className="rounded-xl border bg-white shadow-sm">
            <div className="border-b bg-gray-100 px-5 py-3 font-semibold text-gray-700">
              Profile Settings
            </div>

            <div className="divide-y">
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="font-medium text-gray-800">Edit Profile</p>
                  <p className="text-sm text-gray-500">
                    Update your name, bio and personal details
                  </p>
                </div>

                <button
                  onClick={() => navigate("/settings/profile")}
                  className="rounded bg-[#009DFF] px-4 py-2 text-white hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>

              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="font-medium text-gray-800">Profile Photo</p>
                  <p className="text-sm text-gray-500">Change your display picture</p>
                </div>

                <button
                  onClick={() => navigate("/settings/profile-photo")}
                  className="rounded border px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Update
                </button>
              </div>
            </div>
          </div>

          {/* ACCOUNT ACTIONS */}
          <div className="rounded-xl border bg-white shadow-sm">
            <div className="border-b bg-gray-100 px-5 py-3 font-semibold text-gray-700">
              Account Actions
            </div>

            <div className="divide-y">
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="font-medium text-gray-800">Log Out</p>
                  <p className="text-sm text-gray-500">End your current session securely</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="rounded border border-red-500 px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>

          {/* DANGER ZONE */}
          <div className="rounded-xl border border-red-300 bg-white shadow-sm">
            <div className="border-b bg-red-50 px-5 py-3 font-semibold text-red-700">
              Danger Zone
            </div>

            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-medium text-gray-800">Delete Account</p>
                <p className="text-sm text-gray-500">Permanently remove your account and data</p>
              </div>

              <button className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="order-1 flex min-h-96 flex-col justify-center rounded-xl bg-[#111b21] p-6 shadow-sm md:order-2">
          <Profile user={user} />
        </div>
      </div>
    </div>
  );
}

export default Settings;
