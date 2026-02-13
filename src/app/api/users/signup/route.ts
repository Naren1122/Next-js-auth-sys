import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendVerificationEmail } from "@/utils/email";
import { signUpSchema } from "@/lib/validations/auth";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // Validate request body using Zod schema
    const validationResult = signUpSchema.safeParse(reqBody);

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

    const { email, password, username } = validationResult.data;

    console.log(reqBody);

    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Generate verification token
    const verifyToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const verifyTokenExpiry = Date.now() + 3600000; // 1 hour

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verifyToken,
      verifyTokenExpiry,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send verification email
    await sendVerificationEmail(email, verifyToken);

    return NextResponse.json({
      message:
        "User created successfully. Please check your email to verify your account.",
      success: true,
      savedUser: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        isVerfied: savedUser.isVerfied,
      },
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
