import { NextRequest, NextResponse } from "next/server";

// Mock OTP verification endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, totp } = body;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!email || !totp) {
      return NextResponse.json(
        {
          status: false,
          message: "Email and OTP are required",
        },
        { status: 400 }
      );
    }

    // Mock OTP validation - accept any 6-digit code
    if (totp.length !== 6) {
      return NextResponse.json(
        {
          status: false,
          message: "Invalid OTP code",
        },
        { status: 400 }
      );
    }

    // Mock successful verification
    return NextResponse.json({
      status: true,
      message: "Email verified successfully",
      data: {
        access_token: "mock_access_token_" + Date.now(),
        refresh_token: "mock_refresh_token_" + Date.now(),
        user: {
          id: "mock_user_id",
          first_name: "Demo",
          last_name: "User",
          email: email,
          mobile_number: null,
          created_datetime: new Date().toISOString(),
          updated_datetime: new Date().toISOString(),
        },
      },
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
