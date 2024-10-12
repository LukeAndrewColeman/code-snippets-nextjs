import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

// GET a single snippet by id
export async function GET(request, { params }) {
    const id = params.id;

    try {
        const snippet = await prisma.snippet.findUnique({
            where: {
                id: id,
            },
        });

        if (!snippet) {
            return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
        }

        return NextResponse.json(snippet);
    } catch (error) {
        console.error("Error fetching snippet:", error);
        return NextResponse.json({ error: "Failed to fetch snippet" }, { status: 500 });
    }
}

// PUT update a single snippet by id
export async function PUT(request, { params }) {
    const { id } = params;
    const { title, description, language, codeSnippet } = await request.json();

    try {
        const updatedSnippet = await prisma.snippet.update({
            where: { id: id },
            data: { title, description, language, codeSnippet },
        });

        return NextResponse.json({ success: true, snippet: updatedSnippet });
    } catch (error) {
        console.error("Error updating snippet:", error);
        return NextResponse.json({ success: false, error: "Failed to update snippet" }, { status: 500 });
    }
}

// DELETE a single snippet by id
export async function DELETE(request, { params }) {
    const { id } = params;

    try {
        const deletedSnippet = await prisma.snippet.delete({
            where: { id: id },
        });

        return NextResponse.json({ success: true, message: "Snippet deleted successfully" });
    } catch (error) {
        console.error("Error deleting snippet:", error);
        return NextResponse.json({ success: false, error: "Failed to delete snippet" }, { status: 500 });
    }
}