"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function DeleteAccountButton() {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch("/api/user/delete", {
                method: "DELETE",
            });

            if (response.ok) {
                // Sign out the user after successful deletion
                await signOut({ callbackUrl: "/" });
            } else {
                console.error("Failed to delete account");
            }
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    return (
        <div>
            {!showConfirmation ? (
                <button onClick={() => setShowConfirmation(true)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold">
                    Delete Account
                </button>
            ) : (
                <div className="flex flex-col gap-2">
                    <p className="text-red-600">Are you sure? This action cannot be undone.</p>
                    <div className="flex gap-2">
                        <button onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold">
                            Yes, Delete My Account
                        </button>
                        <button onClick={() => setShowConfirmation(false)} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
