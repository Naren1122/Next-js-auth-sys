"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResendLink, setShowResendLink] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      setError("");
      setShowResendLink(false);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      router.push("/profile");
    } catch (error: unknown) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error || "Login failed";
        setError(errorMessage);
        // Show resend link if email is not verified
        if (error.response.status === 403) {
          setShowResendLink(true);
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Login
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
            {showResendLink && (
              <div className="mt-2">
                <Link
                  href="/resend-verification"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Resend verification email
                </Link>
              </div>
            )}
          </div>
        )}

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
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            id="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <div className="text-right mt-2">
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <Link
            href="/signup"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Don&apos;t have an account? Sign up
          </Link>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onLogin}
          disabled={loading}
        >
          {loading ? "Processing..." : "Login"}
        </button>
      </div>
    </div>
  );
}
