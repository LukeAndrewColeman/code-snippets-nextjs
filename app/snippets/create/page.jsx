'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
    const [formError, setFormError] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        try {
            const response = await fetch('/api/snippets', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            
            if (result.success) {
                router.push('/snippets');
            } else {
                setFormError(result.error || 'Failed to create snippet');
            }
        } catch (error) {
            console.error('Error:', error);
            setFormError('An error occurred while creating the snippet');
        }
    };

    return (
        <div className="container mx-auto mt-6">
            <h1 className="text-center text-3xl text-[#6DC0B4] font-bold py-4">Create a New Code Snippet</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center mt-6 bg-[#28394B] p-10 rounded-xl">
                <div className="flex flex-col w-[60%]">
                    <label htmlFor="title" className="mb-2 font-bold text-lg text-center text-[#6DC0B4]">Title</label>
                    <input type="text" id="title" name="title"
                           className="text-[#1E1E1E] rounded-lg block w-full p-2.5"
                           required
                    />
                </div>
                <div className="flex flex-col w-[60%] mt-6">
                    <label htmlFor="description" className="mb-2 font-bold text-lg text-center text-[#6DC0B4]">Description</label>
                    <input type="text" id="description" name="description"
                           className="text-[#1E1E1E] rounded-lg block w-full p-2.5"
                           required
                    />
                </div>
                <div className="flex flex-col w-[60%] mt-6">
                    <label htmlFor="language" className="mb-2 font-bold text-lg text-center text-[#6DC0B4]">Language</label>
                    <input type="text" name="language" id="language" 
                           className="text-[#1E1E1E] rounded-lg block w-full p-2.5"
                           required
                    />
                </div>
                <div className="flex flex-col w-[60%] mt-6">
                    <label htmlFor="codeSnippet" className="mb-4 font-bold text-lg text-center text-[#6DC0B4]">Code Snippet</label>
                    <textarea id="codeSnippet" name="codeSnippet" rows="15" cols="33"
                              className="text-[#1E1E1E] rounded-lg block w-full p-2.5"
                              required
                    />
                </div>
                <button type="submit" className="mt-6 bg-[#448168] hover:bg-[#5AA99E] text-[#28394B] font-bold px-6 py-2 rounded-full">
                    Create Code Snippet
                </button>
                {formError && <p className="text-red-500 mt-4">{formError}</p>}
            </form>
        </div>
    );
}
