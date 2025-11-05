import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/database';

export async function GET() {
  try {
    const users = getAllUsers();
    
    return NextResponse.json(
      {
        success: true,
        users,
        count: users.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while fetching users',
      },
      { status: 500 }
    );
  }
}
