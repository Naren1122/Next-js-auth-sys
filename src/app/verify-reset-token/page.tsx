"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function VerifyResetToken() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      // Handle the missing token case inside the async flow
      if (!token) {
        setError("Invalid reset link. No token provided.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post("/api/users/verify-reset-token", {
          token,
        });

        if (response.data.success) {
          setValid(true);
          setLoading(false); // Ensure loading is set to false on success
          // Redirect to reset password page after a short delay
          setTimeout(() => {
            router.push(`/reset-password?token=${token}`);
          }, 2000);
        } else {
          setError(response.data.error || "Invalid or expired token");
          setLoading(false);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.error || "Failed to verify reset token",
          );
        } else {
          setError("Failed to verify reset token");
        }
        setLoading(false);
      }
    };

    verifyToken();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Password Reset</h1>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Verifying your token...</p>
          </div>
        ) : valid ? (
          <div className="text-center py-8">
            <div className="text-green-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <p className="text-gray-700 mb-4">Token verified successfully!</p>
            <p className="text-gray-600">
              Redirecting to reset password page...
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-red-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-gray-600 mb-6">
              The reset link is invalid or has expired. Please request a new
              password reset.
            </p>
            <button
              onClick={() => router.push("/forgot-password")}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Request New Reset Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
