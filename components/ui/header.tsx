import envConfig from "@/env.config";
import Navbar from "./navbar";
import { cookies } from "next/headers";

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/categories`, {
    next: { revalidate: 60 },
  });
  const categories = await res.json();

  return <Navbar categories={categories.data} accessToken={token} />;
}
