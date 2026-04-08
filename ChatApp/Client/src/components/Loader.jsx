import React from 'react';
import AppLogo from '../assets/liveLogo.jpg';

function Loader() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#e1ecf7]">
      <img
        src={AppLogo}
        alt="App Logo"
        className="mb-4 h-20 w-20 animate-pulse rounded-xl shadow-md"
      />

      <p className="animate-pulse font-medium text-gray-700">Loading...</p>
    </div>
  );
}

export default Loader;
