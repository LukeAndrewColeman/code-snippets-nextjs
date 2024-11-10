"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/snippets/search?q=${encodeURIComponent(searchTerm.trim())}`);
            onSearch?.(searchTerm);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mx-auto">
            <div className="relative">
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search snippets..." className="w-full p-4 rounded-lg bg-[#E9ECEF] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5AA99E]" />
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#448168] text-white px-4 py-2 rounded-lg hover:bg-[#5AA99E] transition duration-300 font-semibold">
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
