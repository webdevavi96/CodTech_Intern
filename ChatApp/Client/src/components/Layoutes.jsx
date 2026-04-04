import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, Footer } from "./components.js";

function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-[#F3F4F5]">
            <Navbar />
            <main className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-7xl px-6 md:px-16">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Layout