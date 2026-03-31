import React from 'react';
import {Outlet} from "react-router-dom";
import {Navbar, Footer} from "./exportComponents.js";


function Layout() {
  return (
    <>
          <Navbar />
          <main className="min-h-screen bg-[#F1F1F1] w-full pt-20 pb-14">
              <Outlet />
          </main>
          <Footer />
    </>
  )
}

export default Layout