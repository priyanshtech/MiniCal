import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserId } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET /api/tasks - Fetch all tasks for the authenticated user
export async function GET(request) {
    try {
        // Step 1: Get the current user's ID from Auth0 session
        const userId = await getUserId();

        // Step 2: If no user is logged in, return 401 Unauthorized
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized - Please log in' },
                { status: 401 }
            );
        }

        // Step 3: Optional - Get date filter from query params
        // Example: /api/tasks?date=2026-01-19
        const { searchParams } = new URL(request.url);
        const dateParam = searchParams.get('date');

        // Step 4: Build the query filter
        const whereFilter = { userId };

        if (dateParam) {
            // Filter tasks for specific date (00:00:00 to 23:59:59)
            whereFilter.date = {
                gte: new Date(dateParam + 'T00:00:00'),
                lt: new Date(dateParam + 'T23:59:59')
            };
        }

        // Step 5: Fetch tasks from database
        const tasks = await prisma.task.findMany({
            where: whereFilter,
            orderBy: { date: 'asc' } // Sort by date, earliest first
        });

        // Step 6: Return tasks as JSON
        return NextResponse.json({
            tasks,
            count: tasks.length
        });

    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tasks' },
            { status: 500 }
        );
    }
}

// POST /api/tasks - Create a new task for the authenticated user
export async function POST(request) {
    try {
        // Step 1: Get the current user's ID
        const userId = await getUserId();

        // Step 2: Check authentication
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized - Please log in' },
                { status: 401 }
            );
        }

        // Step 3: Parse request body
        const body = await request.json();
        const { title, description, date, priority } = body;

        // Step 4: Validate required fields
        if (!title || !date) {
            return NextResponse.json(
                { error: 'Title and date are required' },
                { status: 400 }
            );
        }

        // Step 5: Create task in database
        // IMPORTANT: userId is set from session, not from request body
        const task = await prisma.task.create({
            data: {
                title,
                description: description || null,
                date: new Date(date),
                priority: priority || 'medium',
                userId // This links the task to the logged-in user
            }
        });

        // Step 6: Return created task
        return NextResponse.json(
            {
                task,
                message: 'Task created successfully'
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error creating task:', error);
        return NextResponse.json(
            { error: 'Failed to create task' },
            { status: 500 }
        );
    }
}
