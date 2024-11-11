import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { SessionProvider } from "next-auth/react";

export const metadata = {
    title: "Code Snippets | Luke Andrew Coleman",
    description: "An app to store your code most used snippets",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <SessionProvider>
                <body>
                    <main className="min-h-screen">
                        <Navbar />
                        {children}
                    </main>
                    <Footer />
                </body>
            </SessionProvider>
        </html>
    );
}
