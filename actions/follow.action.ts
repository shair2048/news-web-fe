"use server";

import { followCategory } from "@/services/category.service";
import { cookies } from "next/headers";

export async function toggleFollowAction(categoryId: object) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const payload = await followCategory.toggleFollowCategory(categoryId, token);

    return {
      success: true,
      isFollowed: payload.isFollowed,
      message: "Success",
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Action Error:", errorMessage);
    return {
      success: false,
      message: errorMessage,
    };
  }
}
