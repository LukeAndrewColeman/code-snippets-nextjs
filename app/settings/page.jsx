import { auth } from "@/auth";
import Image from "next/image";
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
            <div className="bg-[#E9ECEF] p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        {session.user.image ? (
                            <Image src={session.user.image} alt="Profile picture" width={80} height={80} className="rounded-full" />
                        ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-2xl text-gray-500">{session.user.name?.[0]?.toUpperCase() || "?"}</span>
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="text-gray-600">Name</label>
                        <p className="font-medium">{session.user.name || "Not provided"}</p>
                    </div>
                    <div>
                        <label className="text-gray-600">Email</label>
                        <p className="font-medium">{session.user.email}</p>
                    </div>
                </div>
            </div>
            <div className="bg-[#E9ECEF] p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>
                <p className="mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <DeleteAccountButton />
            </div>
        </div>
    );
}
