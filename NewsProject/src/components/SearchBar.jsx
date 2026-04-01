import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("This feature is not available yet!")
        if (!query.trim()) return;
        onSearch(query);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center bg-gray-800 rounded-full px-2 py-1 w-full text-sm"
        >
            <input
                type="text"
                placeholder="Search news..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white px-2"
            />

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full cursor-pointer"
            >
                Search
            </button>
        </form>
    );
}

export default SearchBar;