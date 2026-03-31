import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-gray-300 border-t border-white/10">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {/* Branding */}
        <div>
          <h2 className="text-lg md:text-xl font-bold text-white mb-3">
            News Project
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Stay updated with the latest news from around the world. Fast, reliable, and modern.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/" className="hover:text-blue-400 transition">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/article" className="hover:text-blue-400 transition">
                Articles
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-blue-400 transition">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-blue-400 transition">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>

          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400 transition transform hover:scale-110">
              Twitter
            </a>

            <a href="#" className="hover:text-blue-400 transition transform hover:scale-110">
              Linkedin
            </a>

            <a href="#" className="hover:text-blue-400 transition transform hover:scale-110">
              GitHub
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 text-center py-4 text-xs md:text-sm text-gray-400">
        © {new Date().getFullYear()} News Project. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;