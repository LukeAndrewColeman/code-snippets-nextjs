"use client";
import React from "react";
import Link from "next/link";

const SnippetCard = ({ snippet }) => {
    return (
        <div className="container mx-auto">
            <Link href={`/snippets/${snippet.id}`}>
                <div className="block max-w-sm p-6 rounded-lg shadow-lg bg-[#283b4d]">
                    <h5 className="mb-2 text-2xl font-bold text-[#6dc0b4]">
                        {snippet.title}
                    </h5>
                    <p className="font-normal">{snippet.description}</p>
                    <div className="flex gap-3 mt-4">
                        <p
                            className={`text-sm font-bold py-1 px-3 rounded-full text-[#283b4d] bg-[#80afc0]`}
                        >
                            {snippet.language}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default SnippetCard;
