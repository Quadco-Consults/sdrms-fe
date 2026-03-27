import { NextRequest, NextResponse } from "next/server";

// Mock resend OTP endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!email) {
      return NextResponse.json(
        {
          status: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    // Mock successful response
    return NextResponse.json({
      status: true,
      message: "OTP sent successfully. Please check your email.",
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
