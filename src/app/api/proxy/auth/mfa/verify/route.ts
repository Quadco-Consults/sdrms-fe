import { NextRequest, NextResponse } from "next/server";

// Mock MFA verification endpoint
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
          message: "Email and MFA code are required",
        },
        { status: 400 }
      );
    }

    // Mock MFA validation
    if (totp.length !== 6) {
      return NextResponse.json(
        {
          status: false,
          message: "Invalid MFA code",
        },
        { status: 400 }
      );
    }

    // Mock successful MFA verification
    return NextResponse.json({
      status: true,
      message: "MFA verified successfully",
      data: {
        access_token: "mock_access_token_" + Date.now(),
        refresh_token: "mock_refresh_token_" + Date.now(),
        user: {
          id: "mock_user_id",
          first_name: "Chinedu",
          last_name: "Igwe",
          email: email,
          mobile_number: "+234 123 456 7890",
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
