"use server";

import { articleSaver } from "@/services/article.service";
import { cookies } from "next/headers";

export async function toggleBookmarkAction(articleId: object) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const payload = await articleSaver.toggleBookmark(articleId, token);

    return {
      success: true,
      isBookmarked: payload.isBookmarked,
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
