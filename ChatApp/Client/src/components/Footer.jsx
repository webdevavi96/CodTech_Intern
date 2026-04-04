import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0f0f11] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm font-semibold text-white mb-3">Quick Links</p>
          <div className="flex flex-col gap-2 text-sm">
            <NavLink to="/about" className="hover:text-white">
              About Us
            </NavLink>
            <NavLink to="/contact" className="hover:text-white">
              Contact Us
            </NavLink>
            <NavLink to="/settings" className="hover:text-white">
              Settings
            </NavLink>
          </div>
        </div>

        {/* Branding / Description */}
        <div className="text-sm">
          <p className="text-white font-semibold mb-2">LIVE TALK</p>
          <p>
            A modern platform built for India’s live chat community. Connect,
            share, and communicate in real-time.
          </p>
        </div>

        <div className="text-sm md:text-right">
          <p className="mb-2">
            Developed by{" "}
            <a
              href="https://webdevavi96.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#009DFF] hover:underline"
            >
              Avinash
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:px-14 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          <p>© {new Date().getFullYear()} LIVE TALK. All rights reserved.</p>

          <p>Built for India’s live chat community 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
