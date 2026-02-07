"use client";

import React from "react";

export default function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  return (
    <div>
      <h1>Profile</h1>
      <p className="text-4xl"> profile page {id}</p>
    </div>
  );
}
