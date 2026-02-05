import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserId } from '@/lib/auth';

export const dynamic = 'force-dynamic';

//Get all tasks 
//post all tasks 








// GET /api/tasks - Fetch all tasks for the authenticated user
export async function GET(request) {
    try {

        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized - Please log in' },
                { status: 401 }
            );
        }

        //new URL converts request.url from string to readable url 
        // searchParams is the part after ? in the url 
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date');

        // Step 4: Build the query filter
        const whereFilter = { userId };

        if (date) {
            //gte == greater than equal to 
            // new Date converts this date into readable date 
            whereFilter.date = {
                gte: new Date(date + 'T00:00:00'),
                lt: new Date(date + 'T23:59:59')
            };
        }

        const tasks = await prisma.task.findMany({
            where: whereFilter,
            orderBy: { date: 'asc' }
        });

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

export async function POST(request) {
    try {
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized - Please log in' },
                { status: 401 }
            );
        }


        const body = await request.json();
        const { title, description, date, priority } = body;

        if (!title || !date) {
            return NextResponse.json(
                { error: 'Title and date are required' },
                { status: 400 }
            );
        }

        // userId is set from session, not from request body
        const task = await prisma.task.create({
            data: {
                title,
                description: description || null,
                date: new Date(date),
                priority: priority || 'medium',
                userId
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
