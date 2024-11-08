import "./globals.css";
import Navbar from "@/app/components/Navbar";

export const metadata = {
    title: "Code Snippets | Luke Andrew Coleman",
    description: "An app to store your code snippets",
};

export default function RootLayout({ children }) {
    return (
            <html lang="en">
                <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
