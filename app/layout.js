import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { SessionProvider } from "next-auth/react";

export const metadata = {
    title: "Code Snippets | Luke Andrew Coleman",
    description: "An app to store your code snippets",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <SessionProvider>
                <body>
                    <Navbar />
                    {children}
                </body>
            </SessionProvider>
        </html>
    );
}
