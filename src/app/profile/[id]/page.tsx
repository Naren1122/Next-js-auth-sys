"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, UserCircle } from "lucide-react";

export default function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl mt-10">
        {/* Profile Card */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-4 border-b pb-6 mb-6">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
              <UserCircle size={40} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                User Profile
              </h1>
              <p className="text-gray-500">Detailed view</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-500">User ID</p>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
              <span className="font-mono text-lg text-gray-900 break-all">
                {id}
              </span>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/profile"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
