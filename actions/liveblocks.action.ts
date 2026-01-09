"use server";

import { liveblocksService } from "@/services/liveblocks.service";
import { ResolvedUser } from "@/types/liveblocks.type";
import { cookies } from "next/headers";

export async function authLiveblocksAction(room: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

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
  try {
    const users = await liveblocksService.resolveUsers(userIds);

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
