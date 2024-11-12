import Link from "next/link";
import React from "react";
import UserAvatar from "@/app/components/UserAvatar";
import SigninButton from "@/app/components/SigninButton";
import SignoutButton from "@/app/components/SignoutButton";
import { auth } from "@/auth";

const Navbar = async () => {
    const session = await auth();

    return (
        <div className="navbar p-4 bg-[#E9ECEF] flex justify-between items-center">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                <Link href="/snippets">
                    <div className="flex justify-center items-center">
                        <h2 className="text-2xl font-bold ">Code Snippets</h2>
                    </div>
                </Link>
                <div className="flex justify-center items-center">
                    {session ? (
                        <div className="flex items-center mt-3 sm:mt-0 gap-6">
                            <Link href="/snippets/create">
                                <button className="text-white bg-[#448168] hover:bg-[#5AA99E] px-4 py-2 rounded-lg font-semibold">Create Snippet</button>
                            </Link>
                            <SignoutButton />
                            <UserAvatar session={session} />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
