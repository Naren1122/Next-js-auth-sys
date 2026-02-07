"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
      setLoading(false);
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
      <label htmlFor="username">Username:</label>
      <input
        className="p-2 border rounded-md focus:border-blue-100"
        type="text"
        id="username"
        placeholder="Username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <label htmlFor="email">Email:</label>
      <input
        className="p-2 border rounded-md focus:border-blue-100"
        type="email"
        id="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password">Password:</label>
      <input
        className="p-2 border rounded-md focus:border-blue-100"
        type="password"
        id="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <Link href="/login">Visit Login Page</Link>
      <button
        className="p-2  bg:blue-500 font-bold py border rounded-md focus:border-blue-100 mt-4"
        onClick={onSignup}
      >
        {loading ? "Processing..." : "Signup"}
      </button>
    </div>
  );
}
