import SigninButton from "@/app/components/SigninButton";
import Link from "next/link";
import { auth } from "@/auth";

const Home = async () => {
    const session = await auth();

    console.log(process.env.AUTH_GOOGLE_ID);

    return (
        <div className="home min-h-[91vh] container pt-20 md:pt-32 mx-auto">
            <div className="px-4 flex flex-col items-center">
                <h1 className="text-center text-5xl max-w-[60rem] font-bold mb-10">Streamline your coding workflow with a secure, cloud-based snippet manager</h1>
                <p className="text-center text-xl max-w-[50rem] mb-4 leading-8">Never lose a code snippet again! Whether you're a developer or a hobbyist, our app helps you store, categorize, and quickly access your most-used code snippets. No more sifting through files or scrolling through old projects—everything is neatly organized and available at your fingertips.</p>
                <div className="flex flex-col sm:flex-row mt-4">
                    {session ? (
                        <Link href="/snippets">
                            <button className="bg-[#448168] hover:bg-[#5AA99E]text-white px-4 py-2 rounded-lg font-semibold">View Snippets</button>
                        </Link>
                    ) : (
                        <SigninButton />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
