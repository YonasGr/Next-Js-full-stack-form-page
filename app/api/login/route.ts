import { NextRequest, NextResponse } from 'next/server';
import { getUserByUsernameOrEmail } from '@/lib/database';
import { validateLoginForm } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    // Validate form data
    const validation = validateLoginForm({
      identifier,
      password,
    });

    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // Get user by username or email
    const user = getUserByUsernameOrEmail(identifier);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid username/email or password',
        },
        { status: 401 }
      );
    }

    // SECURITY NOTE: In a production environment, you MUST hash passwords and compare hashes
    // This is a demonstration project - implement password hashing with bcrypt or argon2:
    // Example: const isValidPassword = await bcrypt.compare(password, user.password);
    // For this demo, we're comparing passwords as-is (NOT RECOMMENDED for production)
    if (user.password !== password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid username/email or password',
        },
        { status: 401 }
      );
    }

    // Login successful
    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.full_name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred during login',
      },
      { status: 500 }
    );
  }
}
