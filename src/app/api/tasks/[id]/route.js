import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth";

export const dynamic = "force-dynamic";

//get(specific task by id )
//patch (update or edit task)
//delete(specific task)

export async function GET(
    request,
    { params }
) {
    try { 
        const { id } = await params;
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const task = await prisma.task.findUnique({
            where: { id },
        });

        if (!task) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(task);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch task" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request,
    { params }
) {
    try {
        const { id } = await params;
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        //where and data is a prisma thing 
        const result = await prisma.task.updateMany({
            where: {
                id,
                userId,
            },
            data: body,
        });

        if (result.count === 0) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }

        const task = await prisma.task.findUnique({
            where: { id },
        });

        return NextResponse.json(task);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to update task" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request,
    { params }
) {
    try {
        const { id } = await params;
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const result = await prisma.task.deleteMany({
            where: {
                id,
                userId,
            },
        });

        if (result.count === 0) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to delete task" },
            { status: 500 }
        );
    }
}
