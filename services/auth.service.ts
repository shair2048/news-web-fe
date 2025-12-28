import envConfig from "@/env.config";
import { cookies } from "next/headers";

export async function getUserInfoFromBackend() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) return null;

  try {
    const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/about/me`, {
      method: "GET",
      headers: {
        Cookie: `token=${token.value}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const payload = await res.json();
    return payload.data;
  } catch (error) {
    console.error("Failed to fetch user", error);
    return null;
  }
}
