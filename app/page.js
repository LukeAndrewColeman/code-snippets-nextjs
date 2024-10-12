'use client'
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";

const Home = () => {
    return (
        <div className="home container mx-auto h-[90vh] mt-20 flex ">
            <div className="container mx-auto flex flex-col items-center">
                <h2 className="text-center text-xl max-w-[50rem] text-[#80AFC0] tracking-wide font-bold mb-10">Save, Organize, and Access Code Snippets Anytime</h2>
                <h1 className="text-center text-5xl max-w-[60rem] text-[#6DC0B4] font-bold mb-10">Streamline your coding workflow with a secure, cloud-based snippet manager.</h1>
                <p className="text-center text-xl max-w-[50rem] mb-4 leading-8">Never lose a code snippet again! Whether you're a developer or a hobbyist, our app helps you store, categorize, and quickly access your most-used code snippets. No more sifting through files or scrolling through old projects—everything is neatly organized and available at your fingertips.</p>        
                <div className="flex">
                    <SignedOut>
                        <Link className="m-2 mr-4 bg-[#448168] hover:bg-[#5AA99E] text-[#304152] px-6 py-2 rounded-full font-bold" href='/sign-up'>Start Saving Snippets Today</Link>
                        <Link className="m-2 bg-[#448168] hover:bg-[#5AA99E] text-[#304152] px-6 py-2 rounded-full font-bold" href='/sign-in'>Access My Snippets</Link>
                    </SignedOut>
                </div>
            </div>
        </div>
    );
};

export default Home;
