import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust import path if needed

//get request
//post request



export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get('start');
  const end = searchParams.get('end');
  // Add user authentication check here if needed
  try {
    const ratings = await prisma.dayRating.findMany({
      where: {
        date: {
          gte: start ? new Date(start) : undefined,
          lte: end ? new Date(end) : undefined,
        }
      }
    });
    return NextResponse.json({ ratings });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch ratings' }, { status: 500 });
  }
}
export async function POST(request) {
  try {
    const body = await request.json();
    const { date, rating, userId } = body;
    const upsertedRating = await prisma.dayRating.upsert({
      where: {
        date: new Date(date),
      },
      update: {
        rating,
      },
      create: {
        date: new Date(date),
        rating,
        userId: userId || 'demo-user', // Replace with actual user ID
      },
    });
    return NextResponse.json({ success: true, data: upsertedRating });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save rating' }, { status: 500 });
  }
}