import { NODE_URL } from "@/env.config";
import Navbar from "./navbar";

export default async function Header() {
  const res = await fetch(`${NODE_URL}/api/categories`);
  const categories = await res.json();

  // return <NavbarClient categories={categories.data} />;
  return <Navbar categories={categories.data} />;
}
