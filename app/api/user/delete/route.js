import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // Delete all user's snippets first (assuming you have a snippets table)
        await prisma.snippet.deleteMany({
            where: {
                userId: session.user.id,
            },
        });

        // Delete the user
        await prisma.user.delete({
            where: {
                id: session.user.id,
            },
        });

        return NextResponse.json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("Error deleting account:", error);
        return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
    }
}
