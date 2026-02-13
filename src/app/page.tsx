"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import {
  User,
  Settings,
  LogOut,
  ExternalLink,
  LayoutGrid,
  ShieldCheck,
} from "lucide-react";

export default function SimpleDashboard() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: unknown) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Simple Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 text-sm">
                Welcome back to your account
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors w-fit"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Quick Link */}
          <Link href="/profile" className="group">
            <div className="h-full p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <User size={24} />
                </div>
                <ExternalLink
                  size={18}
                  className="text-gray-300 group-hover:text-blue-500"
                />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                My Profile
              </h3>
              <p className="mt-1 text-gray-500 text-sm">
                View your personal details, user ID, and account status.
              </p>
            </div>
          </Link>

          {/* Settings Quick Link */}
          <Link href="/settings" className="group">
            <div className="h-full p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-zinc-50 text-zinc-600 rounded-xl group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                  <Settings size={24} />
                </div>
                <ExternalLink
                  size={18}
                  className="text-gray-300 group-hover:text-zinc-500"
                />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Account Settings
              </h3>
              <p className="mt-1 text-gray-500 text-sm">
                Manage your security preferences and update your password.
              </p>
            </div>
          </Link>

          {/* Activity Placeholder */}
          <div className="md:col-span-2 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 text-gray-900">
              <LayoutGrid size={20} className="text-blue-600" />
              <h3 className="font-bold text-lg">Recent Activity</h3>
            </div>
            <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-100 rounded-xl">
              <p className="text-gray-400 text-sm">
                No recent activity to show.
              </p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-10 text-center text-xs text-gray-400">
          Signed in as <span className="text-gray-600 font-medium">User</span> •
          AuthFlow v1.0
        </p>
      </div>
    </div>
  );
}
