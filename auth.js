import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        // Handle the session user
        session: async ({ session, user }) => {
            if (session?.user) {
                session.user.id = user.id;
            }
            return session;
        },
        // Add signIn callback to handle the error
        signIn: async ({ user, account, profile }) => {
            // Check if user email exists in database
            const existingUser = await prisma.user.findUnique({
                where: { email: user.email },
                include: { accounts: true },
            });

            if (existingUser && existingUser.accounts.length === 0) {
                // If user exists but has no linked accounts, allow sign in
                return true;
            }

            if (existingUser && existingUser.accounts.length > 0) {
                // If user exists and has linked accounts, check if it's the same provider
                const existingAccount = existingUser.accounts.find((acc) => acc.provider === account.provider);

                if (!existingAccount) {
                    // If no matching provider found, prevent sign in
                    return false;
                }
            }

            return true;
        },
    },
    trustHost: true,
});
