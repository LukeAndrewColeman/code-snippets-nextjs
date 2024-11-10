"use client";
import React from "react";
import Link from "next/link";

const SnippetCard = ({ snippet }) => {
    return (
        <div className="bg-[#E9ECEF] p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <Link href={`/snippets/${snippet.id}`}>
                <div className="cursor-pointer">
                    <h3 className="text-xl font-bold mb-2">{snippet.title}</h3>
                    <p className=" mb-4 line-clamp-3">{snippet.description}</p>
                    <div className="flex justify-between items-center">
                        <span className="bg-[#448168] text-white px-3 py-1 rounded-lg text-sm font-semibold">{snippet.language}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default SnippetCard;
