"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";

const UpdatePage = () => {
    const [formError, setFormError] = useState(false);
    const router = useRouter();
    const { id } = useParams();
    const { data: session } = useSession();

    if (!session) {
        return <div className="container pt-20 md:pt-32 mx-auto text-center text-2xl font-bold">You must be signed in to view this page</div>;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        // Create an object from the form data
        const snippetData = {
            title: formData.get("title"),
            description: formData.get("description"),
            language: formData.get("language"),
            codeSnippet: formData.get("codeSnippet"),
        };

        try {
            const response = await fetch(`/api/snippets/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(snippetData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                router.push("/snippets");
            } else {
                setFormError(result.error || "Failed to update snippet");
            }
        } catch (error) {
            console.error("Error:", error);
            setFormError("An error occurred while updating the snippet");
        }
    };

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const response = await fetch(`/api/snippets/${id}`);
                const data = await response.json();
                if (data) {
                    // Fill in the form fields with the fetched data
                    document.getElementById("title").value = data.title;
                    document.getElementById("description").value = data.description;
                    document.getElementById("language").value = data.language;
                    document.getElementById("codeSnippet").value = data.codeSnippet;
                }
            } catch (error) {
                console.error("Error fetching snippet:", error);
                setFormError("Failed to fetch snippet");
            }
        };

        fetchSnippet();
    }, [id]);

    return (
        <div className="container mx-auto mt-6">
            <h1 className="text-center text-3xl font-bold py-4">Update Code Snippet</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center p-10 rounded-xl">
                <div className="flex flex-col w-full lg:w-[70%]">
                    <label htmlFor="title" className="mb-2 font-bold text-lg text-center">
                        Title
                    </label>
                    <input type="text" id="title" name="title" className="text-[#1E1E1E] rounded-lg block w-full p-2.5 bg-[#E9ECEF]" required />
                </div>
                <div className="flex flex-col w-full lg:w-[70%] mt-6">
                    <label htmlFor="description" className="mb-2 font-bold text-lg text-center">
                        Description
                    </label>
                    <input type="text" id="description" name="description" className="text-[#1E1E1E] rounded-lg block w-full p-2.5 bg-[#E9ECEF]" required />
                </div>
                <div className="flex flex-col w-full lg:w-[70%] mt-6">
                    <label htmlFor="language" className="mb-2 font-bold text-lg text-center">
                        Language
                    </label>
                    <input type="text" name="language" id="language" className="text-[#1E1E1E] rounded-lg block w-full p-2.5 bg-[#E9ECEF]" required />
                </div>
                <div className="flex flex-col w-full lg:w-[70%] mt-6">
                    <label htmlFor="codeSnippet" className="mb-4 font-bold text-lg text-center">
                        Code Snippet
                    </label>
                    <textarea id="codeSnippet" name="codeSnippet" rows="15" cols="33" className="text-[#1E1E1E] rounded-lg block w-full p-2.5 bg-[#E9ECEF] resize-none" required />
                </div>
                <button type="submit" className="tex-center mt-6 bg-[#448168] hover:bg-[#5AA99E] text-white font-semibold px-6 py-2 rounded-lg">
                    Update Code Snippet
                </button>
                {formError && <p className="text-red-500 mt-4">{formError}</p>}
            </form>
        </div>
    );
};

export default UpdatePage;
