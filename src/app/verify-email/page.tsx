"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  verifyEmailSchema,
  type VerifyEmailInput,
} from "@/lib/validations/auth";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
  });

  const onVerifyEmail = async (data: VerifyEmailInput) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const response = await axios.post("/api/users/verify-email", data);
      console.log("Verify email success", response.data);
      setSuccess("Email verified successfully");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: unknown) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error || "Failed to verify email");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1>Verify Email</h1>
      <hr />

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit(onVerifyEmail)}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <Link href="/login">Back to Login</Link>

        <button
          className="p-2 bg:blue-500 font-bold py border rounded-md focus:border-blue-100 mt-4"
          type="submit"
          disabled={loading}
        >
          {loading ? "Processing..." : "Verify Email"}
        </button>
      </form>
    </div>
  );
}
