import { auth } from "@/auth";
import DeleteAccountButton from "../components/DeleteAccountButton";
import { redirect } from "next/navigation";

export default async function Settings() {
    const session = await auth();

    if (!session) {
        redirect("/");
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

            <div className="bg-[#E9ECEF] p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>
                <p className="mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <DeleteAccountButton />
            </div>
        </div>
    );
}
