"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SnippetCard from "@/app/components/SnippetCard";

const ResultsPage = () => {
    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get("search") || "";

    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                const res = await fetch("/api/snippets");
                if (res.ok) {
                    const data = await res.json();
                    const filteredSnippets = data.filter(
                        (snippet) =>
                            (snippet.title?.toLowerCase() || "").includes(
                                searchTerm.toLowerCase()
                            ) ||
                            (snippet.description?.toLowerCase() || "").includes(
                                searchTerm.toLowerCase()
                            ) ||
                            (snippet.code?.toLowerCase() || "").includes(
                                searchTerm.toLowerCase()
                            )
                    );
                    setSnippets(filteredSnippets);
                } else {
                    setError("Failed to fetch snippets");
                }
            } catch (error) {
                setError("An error occurred while fetching snippets");
            } finally {
                setLoading(false);
            }
        };

        fetchSnippets();
    }, [searchTerm]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto mt-8">
            <div className="mb-8">
                <a href="/snippets" className="text-[#6DC0B4] font-bold">
                    Go Back
                </a>
            </div>
            <h1 className="text-2xl font-bold mb-8">
                You searched for "{searchTerm}"
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {snippets.map((snippet) => (
                    <SnippetCard key={snippet.id} snippet={snippet} />
                ))}
            </div>
            {snippets.length === 0 && (
                <p className="text-center mt-8">No results found.</p>
            )}
        </div>
    );
};

export default ResultsPage;
