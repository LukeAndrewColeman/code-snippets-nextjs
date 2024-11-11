export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="container mx-auto px-4 py-8 flex-grow">
                <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

                <div className="space-y-8 max-w-3xl">
                    {/* Last Updated Section */}
                    <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>

                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                        <p className="text-gray-700 leading-relaxed">We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our service.</p>
                    </section>

                    {/* Information We Collect */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Account information (email address, name)</li>
                            <li>Usage data (how you interact with our service)</li>
                            <li>Technical data (IP address, browser type, device information)</li>
                        </ul>
                    </section>

                    {/* How We Use Your Information */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>To provide and maintain our service</li>
                            <li>To notify you about changes to our service</li>
                            <li>To provide customer support</li>
                            <li>To detect, prevent and address technical issues</li>
                        </ul>
                    </section>

                    {/* Data Security */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                        <p className="text-gray-700 leading-relaxed">We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
                    </section>

                    {/* Your Rights */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                        <p className="text-gray-700 leading-relaxed">You have the right to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                            <li>Access your personal data</li>
                            <li>Correct any inaccurate personal data</li>
                            <li>Request deletion of your personal data</li>
                            <li>Object to processing of your personal data</li>
                        </ul>
                    </section>
                </div>
            </main>
        </div>
    );
}
