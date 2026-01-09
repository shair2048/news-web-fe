import envConfig from "@/env.config";
import Navbar from "./navbar";
import { cookies } from "next/headers";
import { getUserInfoFromBackend } from "@/services/auth.service";

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/categories`, {
    next: { revalidate: 60 },
  });
  const categories = await res.json();

  const user = await getUserInfoFromBackend();

  return <Navbar categories={categories.data} accessToken={token} user={user} />;
}
