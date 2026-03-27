import { NextRequest, NextResponse } from "next/server";

// Mock login endpoint - returns fake authentication data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock validation - accept any email/password for demo
    if (!email || !password) {
      return NextResponse.json(
        {
          status: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    // Mock successful login response
    return NextResponse.json({
      status: true,
      message: "Login successful",
      data: {
        access_token: "mock_access_token_" + Date.now(),
        refresh_token: "mock_refresh_token_" + Date.now(),
        token_type: "Bearer",
        force_password_reset: false,
        is_mfa_required: false,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: "An error occurred during login",
      },
      { status: 500 }
    );
  }
}
