"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  KeyRound,
} from "lucide-react";

function VerifyTokenContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
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
          setLoading(false);
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
    <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
          <KeyRound className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Password Reset
        </h1>
      </div>

      {loading ? (
        <div className="text-center py-10 space-y-4">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto" />
          <p className="text-gray-600 font-medium">Verifying your link...</p>
        </div>
      ) : valid ? (
        <div className="text-center py-10 space-y-4">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
          <div className="space-y-2">
            <p className="text-lg font-bold text-gray-900">Token verified!</p>
            <p className="text-sm text-gray-500">
              Redirecting you to the new password page...
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 space-y-4">
          <XCircle className="h-16 w-16 text-red-500 mx-auto" />
          <div className="space-y-2">
            <p className="text-lg font-bold text-gray-900">
              Verification Failed
            </p>
            <p className="text-sm text-red-600">{error}</p>
            <p className="text-xs text-gray-500">
              The reset link is invalid or has expired.
            </p>
          </div>

          <div className="pt-6">
            <button
              onClick={() => router.push("/forgot-password")}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              Request New Reset Link
            </button>
            <button
              onClick={() => router.push("/login")}
              className="mt-3 flex items-center justify-center w-full text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VerifyResetToken() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Suspense
        fallback={
          <div className="text-center">
            <Loader2 className="h-10 w-10 text-gray-300 animate-spin mx-auto" />
          </div>
        }
      >
        <VerifyTokenContent />
      </Suspense>
    </div>
  );
}
