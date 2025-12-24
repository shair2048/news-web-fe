import envConfig from "@/env.config";
import Navbar from "./navbar";

export default async function Header() {
  const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/categories`, {
    next: { revalidate: 60 },
  });
  const categories = await res.json();

  return <Navbar categories={categories.data} />;
}
