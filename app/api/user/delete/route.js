import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // Use a transaction to ensure all operations complete or none do
        await prisma.$transaction(async (tx) => {
            // 1. Delete all sessions first
            await tx.session.deleteMany({
                where: {
                    userId: session.user.id,
                },
            });

            // 2. Delete all accounts
            await tx.account.deleteMany({
                where: {
                    userId: session.user.id,
                },
            });

            // 3. Delete all snippets
            await tx.snippet.deleteMany({
                where: {
                    userId: session.user.id,
                },
            });

            // 4. Finally delete the user
            await tx.user.delete({
                where: {
                    id: session.user.id,
                },
            });
        });

        return NextResponse.json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("Error deleting account:", error);
        return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
    }
}
