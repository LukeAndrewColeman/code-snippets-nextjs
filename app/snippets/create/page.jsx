"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CreatePage() {
    const [formError, setFormError] = useState("");
    const router = useRouter();
    const { data: session } = useSession();

    if (!session) {
        return <div className="container pt-20 md:pt-32 mx-auto text-center text-2xl font-bold">You must be signed in to view this page</div>;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await fetch("/api/snippets", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();

            if (result.success) {
                router.push("/snippets");
            } else {
                setFormError(result.error || "Failed to create snippet");
            }
        } catch (error) {
            console.error("Error:", error);
            setFormError("An error occurred while creating the snippet");
        }
    };

    return (
        <div className="container mx-auto mt-6">
            <h1 className="text-center text-3xl font-bold py-4">Create a New Code Snippet</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center p-10 rounded-xl">
                <div className="flex flex-col w-full lg:w-[70%]">
                    <label htmlFor="title" className="mb-2 font-bold text-lg text-center">
                        Title
                    </label>
                    <input type="text" id="title" name="title" className="text-[#1E1E1E] rounded-lg block w-full p-2.5" required />
                </div>
                <div className="flex flex-col w-full lg:w-[70%] mt-6">
                    <label htmlFor="description" className="mb-2 font-bold text-lg text-center">
                        Description
                    </label>
                    <input type="text" id="description" name="description" className="text-[#1E1E1E] rounded-lg block w-full p-2.5" required />
                </div>
                <div className="flex flex-col w-full lg:w-[70%] mt-6">
                    <label htmlFor="language" className="mb-2 font-bold text-lg text-center">
                        Language
                    </label>
                    <input type="text" name="language" id="language" className="text-[#1E1E1E] rounded-lg block w-full p-2.5" required />
                </div>
                <div className="flex flex-col w-full lg:w-[70%] mt-6">
                    <label htmlFor="codeSnippet" className="mb-4 font-bold text-lg text-center">
                        Code Snippet
                    </label>
                    <textarea id="codeSnippet" name="codeSnippet" rows="15" cols="33" className="text-[#1E1E1E] rounded-lg block w-full p-2.5" required />
                </div>
                <button type="submit" className="mt-6 bg-[#448168] hover:bg-[#5AA99E] text-white font-semibold px-6 py-2 rounded-lg">
                    Create Code Snippet
                </button>
                {formError && <p className="text-red-500 mt-4">{formError}</p>}
            </form>
        </div>
    );
}
