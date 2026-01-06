import envConfig from "@/env.config";
import { cookies } from "next/headers";

export async function deleteUserRequest(userId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to delete user");
  }

  return await res.json();
}
