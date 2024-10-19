'use client'
import React, {useEffect, useState} from 'react';
import SnippetCard from '@/app/components/SnippetCard'
import SearchBar from '@/app/components/SearchBar'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
    const [fetchError, setFetchError] = useState(null)
    const [snippets, setSnippets] = useState([])
    const [languages, setLanguages] = useState(['All'])
    const {userId} = useAuth()
    const [filter, setFilter] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter();

    useEffect(() => {
        const fetchSnippetsAndLanguages = async () => {
            try {
                const res = await fetch('/api/snippets')
                
                if (res.ok) {
                    const data = await res.json()
                    // Validate and clean the data
                    const validatedData = data.map(snippet => ({
                        ...snippet,
                        title: snippet.title || '',
                        description: snippet.description || '',
                        code: snippet.code || '',
                        language: snippet.language || 'Unknown'
                    }))
                    setSnippets(validatedData)
                    
                    // Extract unique languages from the fetched data
                    const uniqueLanguages = ['All', ...new Set(data.map(snippet => snippet.language))]
                    setLanguages(uniqueLanguages)
                    
                    setFetchError(null)
                } else {
                    console.error('Failed to fetch snippets')
                    setSnippets([])
                    setLanguages(['All'])
                    setFetchError('Failed to fetch snippets')
                }
            } catch (error) {
                console.error('Error:', error)
                setSnippets([])
                setLanguages(['All'])
                setFetchError('Failed to fetch snippets')
            }
        }
        
        fetchSnippetsAndLanguages()
        
    }, []);

    const handleSearch = (term) => {
        // Navigate to the results page with the search term
        router.push(`/snippets/search?search=${encodeURIComponent(term)}`);
    };

    const filteredSnippets = snippets
        .filter(snippet => filter === 'All' || snippet.language === filter)
        .filter(snippet => 
            (snippet.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (snippet.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (snippet.code?.toLowerCase() || '').includes(searchTerm.toLowerCase())
        );

    return (
        <div className='p-4'>
            <SearchBar onSearch={handleSearch} />
            <div className="mt-10 container mx-auto">
                <p className='font-bold'>Filter by: </p>
                {languages.map(language => (
                    <button 
                        key={language}
                        onClick={() => setFilter(language)} 
                        className={`text-[#283A4C] hover:bg-[#448168] px-3 py-1 rounded-full text-sm mr-2 mt-4 font-bold ${filter === language ? 'bg-[#448168]' : 'bg-[#5AA99E]'}`}
                    >
                        {language}
                    </button>
                ))}
            </div>

            <div className="justify-center grid grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto mt-8">
                {fetchError && (<p>{fetchError}</p>)}
                {filteredSnippets.map(snippet => (
                    <SnippetCard key={snippet.id} snippet={snippet}/>
                ))}
            </div>
            {filteredSnippets.length === 0 && <h3 className="text-2xl font-bold text-center mt-8">Sorry no snippets found, please add some snippets</h3>}
            {!userId && <h3 className="text-2xl font-bold text-center mt-8">Please login to see code snippets</h3>}
        </div>
    );
};

export default DashboardPage;



