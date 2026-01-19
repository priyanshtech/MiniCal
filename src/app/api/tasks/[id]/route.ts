import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserId } from '@/lib/auth';

// PATCH /api/tasks/[id] - Update a task
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

        // Step 4: Update task
        // IMPORTANT: We use updateMany with userId filter to ensure
        // the user can only update their own tasks
        const result = await prisma.task.updateMany({
            where: {
                id: params.id,
                userId // This ensures user owns the task
            },
            data: body
        });

        // Step 5: Check if task was found and updated
        if (result.count === 0) {
            return NextResponse.json(
                { error: 'Task not found or you do not have permission' },
                { status: 404 }
            );
        }

        // Step 6: Fetch and return the updated task
        const task = await prisma.task.findUnique({
            where: { id: params.id }
        });

        return NextResponse.json({
            task,
            message: 'Task updated successfully'
        });

    } catch (error) {
        console.error('Error updating task:', error);
        return NextResponse.json(
            { error: 'Failed to update task' },
            { status: 500 }
        );
    }
}

// DELETE /api/tasks/[id] - Delete a task
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

        // Step 3: Delete task
        // IMPORTANT: We use deleteMany with userId filter to ensure
        // the user can only delete their own tasks
        const result = await prisma.task.deleteMany({
            where: {
                id: params.id,
                userId // This ensures user owns the task
            }
        });

        // Step 4: Check if task was found and deleted
        if (result.count === 0) {
            return NextResponse.json(
                { error: 'Task not found or you do not have permission' },
                { status: 404 }
            );
        }

        // Step 5: Return success
        return NextResponse.json({
            success: true,
            message: 'Task deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting task:', error);
        return NextResponse.json(
            { error: 'Failed to delete task' },
            { status: 500 }
        );
    }
}
