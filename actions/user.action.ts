// actions/user.ts
"use server";

import { deleteUserRequest } from "@/services/user.service";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(userId: string) {
  try {
    await deleteUserRequest(userId);

    revalidatePath("/dashboard/users");

    return {
      success: true,
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
