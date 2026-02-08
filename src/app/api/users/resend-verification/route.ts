import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendVerificationEmail } from "@/utils/email";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    console.log("Resend verification request for:", email);

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      // For security reasons, don't reveal that the user doesn't exist
      return NextResponse.json({
        message:
          "If an account with this email exists, a verification link has been sent.",
        success: true,
      });
    }

    // Check if user is already verified
    if (user.isVerfied) {
      return NextResponse.json({
        message: "Your email is already verified. You can now log in.",
        success: true,
      });
    }

    // Generate new verification token
    const verifyToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const verifyTokenExpiry = Date.now() + 3600000; // 1 hour

    // Update user with new verification token
    user.verifyToken = verifyToken;
    user.verifyTokenExpiry = verifyTokenExpiry;

    await user.save();

    // Send verification email
    await sendVerificationEmail(email, verifyToken);

    return NextResponse.json({
      message:
        "If an account with this email exists, a verification link has been sent.",
      success: true,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
