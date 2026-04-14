import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer, Loader } from './components.js';

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#e1ecf7]">
      <Navbar />
      <main className="my-2 flex h-full flex-1">
        <div className="w-full px-6 md:px-16">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
