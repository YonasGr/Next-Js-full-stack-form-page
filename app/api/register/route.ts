import { NextRequest, NextResponse } from 'next/server';
import { createUser, usernameExists, emailExists } from '@/lib/database';
import { validateRegistrationForm } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password, confirmPassword, fullName } = body;

    // Validate form data
    const validation = validateRegistrationForm({
      username,
      email,
      password,
      confirmPassword,
      fullName,
    });

    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // Check if username already exists
    if (usernameExists(username)) {
      return NextResponse.json(
        {
          success: false,
          errors: [{ field: 'username', message: 'Username already exists' }],
        },
        { status: 400 }
      );
    }

    // Check if email already exists
    if (emailExists(email)) {
      return NextResponse.json(
        {
          success: false,
          errors: [{ field: 'email', message: 'Email already exists' }],
        },
        { status: 400 }
      );
    }

    // SECURITY NOTE: In a production environment, you MUST hash passwords before storing them
    // This is a demonstration project - implement password hashing with bcrypt or argon2:
    // Example: const hashedPassword = await bcrypt.hash(password, 10);
    // For this demo, we're storing passwords as-is (NOT RECOMMENDED for production)
    const newUser = createUser({
      username,
      email,
      password, // In production: hash this with bcrypt or similar
      full_name: fullName,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          fullName: newUser.full_name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred during registration',
      },
      { status: 500 }
    );
  }
}
