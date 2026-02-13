"use client";
import Link from "next/link";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  verifyEmailSchema,
  type VerifyEmailInput,
} from "@/lib/validations/auth";
import {
  ShieldCheck,
  Mail,
  ArrowLeft,
  Loader2,
  CheckCircle2,
} from "lucide-react";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [autoVerified, setAutoVerified] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
  });

  // 1. Move the callback ABOVE the useEffect (Fixes "used before declaration" error)
  const verifyEmailWithToken = useCallback(
    async (token: string) => {
      try {
        setLoading(true);
        setError("");
        setSuccess("");
        await axios.post("/api/users/verify-email", { token });
        setSuccess("Email verified successfully! Redirecting...");
        setAutoVerified(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (err: unknown) {
        setLoading(false);
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.error || "Failed to verify email");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
    [router],
  ); // Removed 'autoVerified' (Fixes "unnecessary dependency" error)

  // 2. useEffect now correctly references the defined callback
  useEffect(() => {
    const token = searchParams.get("token");
    if (token && !autoVerified) {
      verifyEmailWithToken(token);
    }
  }, [searchParams, autoVerified, verifyEmailWithToken]);

  const onVerifyEmail = async (data: VerifyEmailInput) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await axios.post("/api/users/verify-email", data);
      setSuccess("Email verified successfully! Redirecting...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: unknown) {
      setLoading(false);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || "Failed to verify email");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Verify Email
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Confirm your email address to secure your account.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded transition-all">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm rounded flex items-center transition-all">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            {success}
          </div>
        )}

        {!autoVerified && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onVerifyEmail)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                type="email"
                id="email"
                placeholder="name@example.com"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !!success}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Verifying...
              </span>
            ) : (
              "Verify Email"
            )}
          </button>
        </form>
        )}

        <div className="text-center mt-6 pt-6 border-t border-gray-100">
          <Link
            href="/login"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

// 3. Final Export with Suspense (Required for Next.js build)
export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="animate-spin text-blue-600 h-10 w-10" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
