import { NextRequest, NextResponse } from "next/server";

// Mock signup endpoint - returns fake registration data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { first_name, last_name, email, password } = body;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock validation
    if (!first_name || !last_name || !email || !password) {
      return NextResponse.json(
        {
          status: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Check for duplicate email (mock)
    if (email === "existing@example.com") {
      return NextResponse.json(
        {
          status: false,
          message: "Email already exists",
        },
        { status: 409 }
      );
    }

    // Mock successful signup response
    return NextResponse.json({
      status: true,
      message: "Registration successful. Please verify your email.",
      user_id: "mock_user_id_" + Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: "An error occurred during registration",
      },
      { status: 500 }
    );
  }
}
