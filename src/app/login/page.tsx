"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      router.push("/profile");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Error message:", error.message);
      } else {
        console.log("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1>Signup</h1>
      <hr />

      <label htmlFor="email">Email:</label>
      <input
        className="p-2 border rounded-md focus:border-blue-100"
        type="text"
        id="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password">Password:</label>
      <input
        className="p-2 border rounded-md focus:border-blue-100"
        type="text"
        id="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Link href="/signup" className="mt-5 mb-5">
        Signup
      </Link>
      <button
        className="p-2 border rounded-md focus:border-blue-500"
        onClick={onLogin}
      >
        {loading ? "Processing..." : "Login"}
      </button>
    </div>
  );
}
