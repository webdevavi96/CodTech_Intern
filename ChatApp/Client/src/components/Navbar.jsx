import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);

  const linkClass = ({ isActive }) =>
    `px-5 py-1.5 rounded-full font-medium transition ${
      isActive ? "bg-[#009DFF] text-white" : "text-white border border-[#009DFF] hover:bg-[#009DFF]"
    }`;

  return (
    <header className="w-full bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-16">
        <h1 className="text-xl font-bold tracking-wide">
          <span className="text-[#FF0000]">LIVE</span> <span className="text-white">TALK</span>
        </h1>

        {!isAuthenticated && (
          <div className="flex items-center gap-4">
            <Link to="/login" className={linkClass}>
              Login
            </Link>

            <Link to="/register" className={linkClass}>
              Sign Up
            </Link>
          </div>
        )}

        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <NavLink to="/home" className={linkClass}>
              Chats
            </NavLink>

            <NavLink to="/calls" className={linkClass}>
              Calls
            </NavLink>

            <NavLink to="/settings" className={linkClass}>
              Settings
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
