import React from "react";
import Image from "next/image";

const UserAvatar = ({ session }) => {
    return (
        <div className="hidden sm:block">
            <Image src={session?.user?.image} alt="user avatar" className="rounded-full" width={30} height={30} />
        </div>
    );
};

export default UserAvatar;
