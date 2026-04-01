import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { SearchBar } from "./exportComponents.js";
import { Menu, X } from "lucide-react";

function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleSearch = (query) => {
        navigate(`/search?q=${query}`);
        setIsOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black text-white shadow-lg">

            <div className="flex items-center justify-between px-4 md:px-6 h-16">

                <NavLink
                    to="/"
                    className="text-lg md:text-xl font-bold text-pink-500 hover:text-pink-600"
                >
                    News Today
                </NavLink>

                <div className="hidden md:block w-full max-w-sm mx-4">
                    <SearchBar onSearch={handleSearch} />
                </div>

                <ul className="hidden md:flex items-center space-x-6">
                    <li>
                        <NavLink to="/" className={({ isActive }) =>
                            isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
                        }>Home</NavLink>
                    </li>

                    <li>
                        <NavLink to="/about" className={({ isActive }) =>
                            isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
                        }>About</NavLink>
                    </li>
                </ul>

                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden bg-black border-t border-white/10 px-4 pb-4">

                    <div className="mb-4">
                        <SearchBar onSearch={handleSearch} />
                    </div>

                    <ul className="flex flex-col space-y-3">
                        <li>
                            <NavLink to="/" onClick={() => setIsOpen(false)}>
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/article" onClick={() => setIsOpen(false)}>
                                Article
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/about" onClick={() => setIsOpen(false)}>
                                About
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;