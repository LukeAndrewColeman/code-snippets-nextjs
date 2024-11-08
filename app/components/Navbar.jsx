import Link from "next/link";
import React from "react";

const Navbar = async () => {
    {/* TODO: grab session */}

    return (
        <div className="navbar p-4 bg-[#283A4C] flex justify-between items-center">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                <Link href="/snippets">
                    <div className="flex justify-center items-center">
                        <h2 className="text-2xl font-bold ">CODE SNIPPETS</h2>
                    </div>
                </Link>
                <div className="flex justify-center items-center">
                    {/* TODO: add login/logout button */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
