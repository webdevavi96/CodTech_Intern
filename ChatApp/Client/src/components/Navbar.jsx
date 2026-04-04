import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-black w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-4 flex items-center justify-between">

        <h1 className="text-xl font-bold tracking-wide">
          <span className="text-[#FF0000]">LIVE</span>{" "}
          <span className="text-white">TALK</span>
        </h1>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="bg-[#009DFF] text-white px-5 py-1.5 rounded-full font-medium hover:bg-blue-600 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="border border-[#009DFF] text-white px-5 py-1.5 rounded-full font-medium hover:bg-[#009DFF] transition"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Navbar;