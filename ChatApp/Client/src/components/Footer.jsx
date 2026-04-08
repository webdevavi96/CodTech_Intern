import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#0f0f11] text-gray-400">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 md:grid-cols-3 md:px-12">
        <div>
          <p className="mb-3 text-sm font-semibold text-white">Quick Links</p>
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
          <p className="mb-2 font-semibold text-white">LIVE TALK</p>
          <p>
            A modern platform built for India’s live chat community. Connect, share, and communicate
            in real-time.
          </p>
        </div>

        <div className="text-sm md:text-right">
          <p className="mb-2">
            Developed by{' '}
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
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 text-sm md:flex-row md:px-14">
          <p>© {new Date().getFullYear()} LIVE TALK. All rights reserved.</p>

          <p>Built for India’s live chat community 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
