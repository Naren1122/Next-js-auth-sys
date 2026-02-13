"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// Icons for a polished look
import { UserCircle, LogOut, FileText } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: unknown) {
      toast.error("Logout failed");
      console.log(
        error instanceof Error ? error.message : "Unknown error occurred",
      );
    }
  };

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
      toast.success("User details fetched");
    } catch (error: unknown) {
      toast.error("Failed to get user details");
      console.log(
        error instanceof Error ? error.message : "Failed to get user details",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl mt-10">
        {/* Profile Card */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-4 border-b pb-6">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
              <UserCircle size={40} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                Account Dashboard
              </h1>
              <p className="text-gray-500">Welcome back to your profile</p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Your User ID
              </h3>
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-sm text-gray-800 break-all bg-white p-2 rounded border">
                  {data === "nothing" ? "Click button to fetch ID" : data}
                </span>
                {data !== "nothing" && (
                  <Link
                    href={`/profile/${data}`}
                    /* Updated flex-shrink-0 to shrink-0 below */
                    className="shrink-0 flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    <FileText className="mr-1 h-4 w-4" />
                    View
                  </Link>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={getUserDetails}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors disabled:opacity-50"
              >
                {loading ? "Fetching..." : "Get User Details"}
              </button>

              <button
                onClick={logout}
                className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 rounded-md border border-gray-300 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
