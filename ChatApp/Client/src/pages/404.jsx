import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-[#e1ecf7] px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-[#FF0000]">404</h1>

      <h2 className="mb-2 text-2xl font-semibold text-gray-800">Page Not Found</h2>

      <p className="mb-6 max-w-md text-gray-600">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="rounded-full bg-[#009DFF] px-6 py-2 text-white transition hover:bg-blue-600"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
