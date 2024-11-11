const Footer = () => {
    return (
        <footer className="bg-gray-100 mt-auto py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Left side */}
                    <div className="mb-4 md:mb-0">
                        <p className="text-gray-600">© 2024 Code Snippets. All rights reserved.</p>
                    </div>

                    {/* Right side */}
                    <div className="flex gap-4">
                        <a href="/privacy" className="text-gray-600 hover:text-gray-800">
                            Privacy Policy
                        </a>
                        <a href="/settings" className="text-gray-600 hover:text-gray-800">
                            Account Settings
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
