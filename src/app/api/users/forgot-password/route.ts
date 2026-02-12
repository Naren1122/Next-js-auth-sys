import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendPasswordResetEmail } from "@/utils/email";
import { emailSchema } from "@/lib/validations/auth";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // Validate request body using Zod schema
    const validationResult = emailSchema.safeParse(reqBody);

    if (!validationResult.success) {
      // Extract and format validation errors
      const errors = validationResult.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return NextResponse.json(
        {
          error: "Validation failed",
          errors,
        },
        { status: 400 },
      );
    }

    const { email } = validationResult.data;

    console.log("Forgot password request for email:", email);

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email address" },
        { status: 404 },
      );
    }

    // Check if user is verified
    if (!user.isVerfied) {
      return NextResponse.json(
        {
          error:
            "Please verify your email address before resetting your password",
        },
        { status: 403 },
      );
    }

    // Generate forgot password token
    const forgotPasswordToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const forgotPasswordTokenExpiry = Date.now() + 3600000; // 1 hour

    // Update user with forgot password token
    user.forgotPasswordToken = forgotPasswordToken;
    user.forgotPasswordTokenExpiry = forgotPasswordTokenExpiry;
    await user.save();

    // Send password reset email
    await sendPasswordResetEmail(email, forgotPasswordToken);

    return NextResponse.json({
      message: "Password reset link sent to your email",
      success: true,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
