import { NODE_URL } from "@/env.config";
import Navbar from "./navbar";

export default async function Header() {
  const res = await fetch(`${NODE_URL}/api/categories`, {
    next: { revalidate: 60 },
  });
  const categories = await res.json();

  return <Navbar categories={categories.data} />;
}
