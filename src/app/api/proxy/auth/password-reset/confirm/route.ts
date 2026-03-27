import { NextRequest, NextResponse } from "next/server";

// Mock password reset confirm endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, new_password } = body;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!email || !new_password) {
      return NextResponse.json(
        {
          status: false,
          message: "Email and new password are required",
        },
        { status: 400 }
      );
    }

    // Mock successful response
    return NextResponse.json({
      status: true,
      message: "Password reset successful. You can now login with your new password.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: "An error occurred",
      },
      { status: 500 }
    );
  }
}
