"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

const SnippetPage = () => {
    const [snippet, setSnippet] = useState(null);
    const [error, setError] = useState(null);
    const [copyNotification, setCopyNotification] = useState(false);
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();

    if (!session) {
        return <div className="container pt-20 md:pt-32 mx-auto text-center text-2xl font-bold">You must be signed in to view this page</div>;
    }

    const handleCopyClick = () => {
        const codeSnippet = snippet.codeSnippet;
        const textarea = document.createElement("textarea");
        textarea.value = codeSnippet;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopyNotification(true);
        setTimeout(() => {
            setCopyNotification(false);
        }, 2000);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/snippets/${snippet.id}`, {
                method: "DELETE",
            });

            router.push("/snippets");

            if (!response.ok) {
                throw new Error("Failed to delete snippet");
            }
        } catch (error) {
            console.error("Error deleting snippet:", error);
            setError("Failed to delete snippet");
        }
    };

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const res = await fetch(`/api/snippets/${id}`);

                if (res.ok) {
                    const data = await res.json();
                    setSnippet(data);
                } else {
                    setError("Failed to fetch snippet");
                }
            } catch (err) {
                console.error("Error:", err);
                setError("Failed to fetch snippet");
            }
        };

        fetchSnippet();
    }, [id]);

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto flex justify-center">
            {snippet && (
                <div className="p-10">
                    <div className="flex flex-col items-center p-10 rounded-xl bg-[#E9ECEF]">
                        <h5 className="mb-2 text-3xl font-bold pb-2">{snippet.title}</h5>
                        <p className="font-normal mb-3">{snippet.description}</p>
                        <pre className="mt-4 text-sm bg-[#FEFCFF] text-[#283A4C] p-6 rounded-xl">
                            <code className="">{snippet.codeSnippet}</code>
                        </pre>
                        <div className="flex gap-3 mt-4">
                            <p className="text-sm py-1 px-3 bg-[#C5C8D0] rounded-lg font-semibold">{snippet.language}</p>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <Link href={`/snippets/update/${snippet.id}`}>
                                <p className="text-sm text-white py-1 px-3 bg-[#448168] hover:bg-[#5AA99E] rounded-lg font-semibold">Edit</p>
                            </Link>
                            <button onClick={handleCopyClick}>
                                <p className="text-sm text-white py-1 px-3 bg-[#448168] hover:bg-[#5AA99E] rounded-lg font-semibold">Copy</p>
                            </button>
                            <button onClick={handleDelete}>
                                <p className="text-sm text-white py-1 px-3 bg-[#448168] hover:bg-[#5AA99E] rounded-lg font-semibold">Delete</p>
                            </button>
                        </div>
                        {copyNotification && <div className="mt-6">Copied code!</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SnippetPage;
