// lib/validations/auth.ts
import { z } from "zod";

// Email regex pattern for common email providers
const emailRegex =
  /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|aol\.com|icloud\.com|protonmail\.com|mail\.com|yandex\.com|zoho\.com|gmx\.com|[\w.-]+\.[a-zA-Z]{2,})$/;

// Password regex pattern: at least 6 characters with numbers, lowercase, uppercase, and special symbols
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/;

// Email validation schema
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(
      emailRegex,
      "Invalid email format. Please use a valid email address.",
    ),
});

// Password validation schema
export const passwordSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*())",
    ),
});

// Combined auth schema for signup
export const signUpSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(
      emailRegex,
      "Invalid email format. Please use a valid email address.",
    ),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*())",
    ),
});

// Login schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(
      emailRegex,
      "Invalid email format. Please use a valid email address.",
    ),
  password: z.string().min(1, "Password is required"),
});

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(
      emailRegex,
      "Invalid email format. Please use a valid email address.",
    ),
});

// Reset password schema
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Reset token is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*())",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Verify email schema
export const verifyEmailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(
      emailRegex,
      "Invalid email format. Please use a valid email address.",
    ),
});

// Resend verification schema
export const resendVerificationSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(
      emailRegex,
      "Invalid email format. Please use a valid email address.",
    ),
});

// Type exports for TypeScript
export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type ResendVerificationInput = z.infer<typeof resendVerificationSchema>;
