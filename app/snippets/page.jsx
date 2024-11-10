"use client";
import React, { useState } from "react";
import SearchBar from "@/app/components/SearchBar";
import FilterButtons from "@/app/components/FilterButtons";
import SnippetGrid from "@/app/components/SnippetGrid";
import { useSnippets } from "@/app/hooks/useSnippets";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
    const { data: session } = useSession();
    const { snippets, languages, fetchError } = useSnippets();
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("All");
    const [visibleSnippets, setVisibleSnippets] = useState(8);

    if (!session) {
        return <div className="container pt-20 md:pt-32 mx-auto text-center text-2xl font-bold">You must be signed in to view this page</div>;
    }

    const handleSearch = (term) => {
        setSearchTerm(term);
        setVisibleSnippets(12); // Reset visible snippets when searching
    };

    const handleFilterChange = (language) => {
        setFilter(language);
        setVisibleSnippets(12); // Reset visible snippets when filtering
    };

    const handleLoadMore = () => {
        setVisibleSnippets((prev) => prev + 12);
    };

    // Filter snippets based on search term and language filter
    const filteredSnippets = snippets.filter((snippet) => {
        const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) || snippet.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "All" || snippet.language === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="p-8">
            <SearchBar onSearch={handleSearch} />
            <FilterButtons languages={languages} filter={filter} onFilterChange={handleFilterChange} />
            <SnippetGrid snippets={filteredSnippets} fetchError={fetchError} visibleSnippets={visibleSnippets} onLoadMore={handleLoadMore} />
        </div>
    );
};

export default DashboardPage;
