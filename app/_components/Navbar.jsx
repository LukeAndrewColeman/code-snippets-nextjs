import Link from 'next/link';
import React from 'react';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { checkUser } from '../../lib/checkUser';

const Navbar = async () => {
    const user = await checkUser();

    return (
        <div className="navbar h-[10vh] bg-[#283A4C] flex justify-between items-center">
            <div className="container mx-auto flex justify-between items-center">
            <Link href='/snippets'>
                <div className="flex justify-center items-center">
                    <h2 className="text-2xl font-bold ">CODE SNIPPETS</h2>
                </div>
            </Link>
            <div className="flex justify-center items-center">
                <SignedIn>
                    <Link href="/snippets/create" className="m-2 mr-6 bg-[#448168] hover:bg-[#5AA99E] text-[#304152] px-6 py-2 rounded-full font-bold">Create Snippet</Link>
                    <UserButton />
                </SignedIn>
            </div>
            </div>
        </div>
    );
};

export default Navbar;