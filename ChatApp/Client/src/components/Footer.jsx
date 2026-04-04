import React from "react";

function Footer() {
  return (
    <footer className="bg-[#0f0f11] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-3">

        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} LIVE TALK. All rights reserved.
        </p>

        <p className="text-sm text-center md:text-right">
          Built for India’s live chat community
        </p>

        <p className="text-sm text-center md:text-right">
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
    </footer>
  );
}

export default Footer;