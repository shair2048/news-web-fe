"use server";

import envConfig from "@/env.config";
import { cookies } from "next/headers";

export async function setTokenCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: envConfig.NEXT_PUBLIC_API_ENDPOINT === "production",
    sameSite: "lax",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
}

export async function removeTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}
