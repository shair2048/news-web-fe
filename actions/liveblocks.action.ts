"use server";

import { liveblocksService } from "@/services/liveblocks.service";
import { ResolvedUser } from "@/types/liveblocks.type";
import { cookies } from "next/headers";

export async function authLiveblocksAction(room: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  try {
    const result = await liveblocksService.authenticate(room, token);
    return result;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Liveblocks Auth Action Error:", errorMessage);

    throw new Error(errorMessage);
  }
}

export async function resolveUsersAction(userIds: string[]): Promise<ResolvedUser[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.error("No token found for resolveUsers");
    return userIds.map(() => ({
      name: "Anonymous",
      avatar: "",
    }));
  }

  try {
    const users = await liveblocksService.resolveUsers(userIds, token);

    return users.map((user: { name?: string; avatar?: string }) => ({
      name: user.name || "Anonymous",
      avatar: user.avatar || "",
    }));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Resolve users action error:", errorMessage);

    // Fallback to Anonymous
    return userIds.map(() => ({
      name: "Anonymous",
      avatar: "",
    }));
  }
}
