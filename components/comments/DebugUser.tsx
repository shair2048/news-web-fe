"use client";

import { useSelf } from "@liveblocks/react/suspense";

export function DebugUser() {
  // Hook suspense from Liveblocks
  const user = useSelf();

  console.log("=== DEBUG LIVEBLOCKS USER ===");
  console.log("User ID:", user.id);
  console.log("User Info:", user.info);

  return (
    <div className="p-4 bg-gray-100 text-xs text-red-500 mb-4 border border-red-300">
      <p>Debug User (Xem Console F12):</p>
      <p>Name: {user.info?.name || "Không tìm thấy tên"}</p>
    </div>
  );
}
