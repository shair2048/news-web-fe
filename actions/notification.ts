"use server";

import envConfig from "@/env.config";
import { cookies } from "next/headers";

export async function markNotificationAsRead(notificationId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return { success: false, message: "Unauthorized" };

  try {
    const res = await fetch(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/notifications/${notificationId}/read`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      return { success: false, message: "Failed to mark as read" };
    }

    return { success: true };
  } catch (error) {
    console.error("Server Action Error:", error);
    return { success: false, message: "Internal Server Error" };
  }
}
