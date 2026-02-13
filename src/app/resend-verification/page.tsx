"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resendVerificationSchema,
  type ResendVerificationInput,
} from "@/lib/validations/auth";
import {
  ArrowLeft,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function ResendVerificationPage() {
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [canResend, setCanResend] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResendVerificationInput>({
    resolver: zodResolver(resendVerificationSchema),
  });

  const onSubmit = async (data: ResendVerificationInput) => {
    setStatus("loading");
    setIsResending(true);

    try {
      const response = await axios.post("/api/users/resend-verification", data);
      setStatus("success");
      setMessage(
        response.data.message || "Verification link sent successfully!",
      );
      setCanResend(false);
      setCountdown(60);
    } catch (error) {
      setStatus("error");
      let errorMessage = "Unknown error";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage =
          error.response.data.error || "Failed to send verification link";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setMessage(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && canResend === false) {
      setCanResend(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [countdown, canResend]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        {/* Header Section */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Verify Email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email to receive a new verification link.
          </p>
        </div>

        {/* Dynamic Content based on Status */}
        <div className="mt-8">
          {status === "idle" && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="mt-1 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                  placeholder="name@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!canResend || isResending}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {!canResend
                  ? `Resend in ${countdown}s`
                  : isResending
                    ? "Sending..."
                    : "Send Verification Link"}
              </button>
            </form>
          )}

          {status === "loading" && (
            <div className="py-10 text-center space-y-4">
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto" />
              <p className="text-gray-700 font-medium">Sending your link...</p>
            </div>
          )}

          {status === "success" && (
            <div className="text-center space-y-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Link Sent!</h2>
              <p className="text-gray-600 text-sm">{message}</p>

              <div className="pt-4 space-y-3">
                <button
                  onClick={() => router.push("/login")}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-bold hover:bg-blue-700 transition-all"
                >
                  Go to Login
                </button>
                {!canResend && (
                  <p className="text-xs text-gray-400">
                    Didn&apos;t get it? You can try again in {countdown}s
                  </p>
                )}
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="text-center space-y-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-600">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Something went wrong
              </h2>
              <p className="text-red-600 text-sm">{message}</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 w-full bg-gray-800 text-white py-3 px-4 rounded-md font-bold hover:bg-gray-900 transition-all"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Back link - hidden if success to keep focus on action */}
        {status !== "success" && (
          <div className="text-center mt-6 border-t pt-6">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
