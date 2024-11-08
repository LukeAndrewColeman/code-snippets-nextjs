import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex flex-col gap-2 items-center">
            <h1 className="my-8 text-3xl font-bold text-[#6DC0B4]">
                Please use the form below to sign in
            </h1>
            <SignIn />
        </div>
    );
}
