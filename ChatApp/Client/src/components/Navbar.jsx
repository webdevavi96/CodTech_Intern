import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);

  const linkClass = ({ isActive }) =>
    `px-5 py-1.5 rounded-full font-medium transition ${isActive
      ? "bg-[#009DFF] text-white"
      : "text-white border border-[#009DFF] hover:bg-[#009DFF]"
    }`;

  return (
    <header className="w-full bg-black">
      <div className="mx-auto max-w-7xl px-4 py-4 lg:px-16 flex flex-col md:flex-row space-y-2 md:space-y-0 items-center justify-between">

        <h1 className="text-xl font-bold tracking-wide">
          <span className="text-[#FF0000]">LIVE</span>{" "}
          <span className="text-white">TALK</span>
        </h1>

        <div className="flex items-center gap-4 flex-wrap">

          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={linkClass}>
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/home" className={linkClass}>
                Chats
              </NavLink>
              <NavLink to="/calls" className={linkClass}>
                Calls
              </NavLink>
              <NavLink to="/settings" className={linkClass}>
                Settings
              </NavLink>
            </>
          )}

        </div>
      </div>
    </header>
  );
}

export default Navbar;