import { useState, useEffect } from "react";

export const useSnippets = () => {
    const [fetchError, setFetchError] = useState(null);
    const [snippets, setSnippets] = useState([]);
    const [languages, setLanguages] = useState(["All"]);

    useEffect(() => {
        const fetchSnippetsAndLanguages = async () => {
            try {
                const res = await fetch("/api/snippets");
                if (res.ok) {
                    const data = await res.json();
                    setSnippets(data);

                    // Extract unique languages from snippets
                    const uniqueLanguages = [...new Set(data.map((snippet) => snippet.language))];
                    setLanguages(["All", ...uniqueLanguages]);
                    setFetchError(null);
                } else {
                    setFetchError("Failed to fetch snippets");
                }
            } catch (error) {
                setFetchError("Error fetching snippets: " + error.message);
            }
        };

        fetchSnippetsAndLanguages();
    }, []);

    return { snippets, languages, fetchError };
};
