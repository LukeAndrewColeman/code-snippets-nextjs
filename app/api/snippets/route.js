import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
      // Get the current user's ID
      const { userId } = auth();

      // Check if the user is authenticated
      if (!userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }

      // Fetch snippets from the database for the current user, ordered by language
      const snippets = await prisma.snippet.findMany({
        where: {
          userId: userId
        },
        orderBy: {
          language: 'desc'
        }
      });
  
      // Return the data as JSON
      return new Response(JSON.stringify(snippets), { status: 200 });
    } catch (error) {
      console.error('Error fetching snippets:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch snippets' }), { status: 500 });
    }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Extract data from formData
    const title = formData.get('title');
    const description = formData.get('description');
    const language = formData.get('language');
    const codeSnippet = formData.get('codeSnippet');

    // Validate the data
    if (!title || !description || !language || !codeSnippet) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
    }

    // Get logged in user
    const { userId } = auth();

    // Check for user
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    // Create the snippet in the database
    const snippet = await prisma.snippet.create({
      data: {
        title,
        description,
        language,
        codeSnippet,
        userId
      },
    });

    return new Response(JSON.stringify({ success: true, snippet }), { status: 201 });
  } catch (error) {
    console.error('Error creating snippet:', error);
    return new Response(JSON.stringify({ success: false, error: 'An error occurred while creating the snippet' }), { status: 500 });
  }
}