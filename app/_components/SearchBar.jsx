"use client"
import React, {useState} from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSearch} className="flex justify-center mt-10">
            <input
                type="text"
                placeholder="Search snippets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 w-1/2 border rounded-l-full text-[#283A4C]"
            />
            <button
                type="submit"
                className="bg-[#448168] text-[#283A4C] px-6 py-2 rounded-r-full hover:bg-[#5AA99E] transition duration-300 text-[#304152] font-bold"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;