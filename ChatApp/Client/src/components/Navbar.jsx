import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);

  const linkClass = ({ isActive }) =>
    `relative px-2 py-1 font-medium transition ${
      isActive ? 'text-[#00A884]' : 'text-gray-400 hover:text-white'
    }`;

  return (
    <header className="w-full bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between space-y-2 px-4 py-4 md:flex-row md:space-y-0 lg:px-16">
        <h1 className="text-xl font-bold tracking-wide">
          <span className="text-[#FF0000]">LIVE</span> <span className="text-white">TALK</span>
        </h1>

        <div className="flex flex-wrap items-center gap-4">
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
                {({ isActive }) => (
                  <span className="relative">
                    Chats
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#00A884]"></span>
                    )}
                  </span>
                )}
              </NavLink>
              <NavLink to="/calls" className={linkClass}>
                {({ isActive }) => (
                  <span className="relative">
                    Calls
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#00A884]"></span>
                    )}
                  </span>
                )}
              </NavLink>
              <NavLink to="/settings" className={linkClass}>
                {({ isActive }) => (
                  <span className="relative">
                    Settings
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#00A884]"></span>
                    )}
                  </span>
                )}
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
