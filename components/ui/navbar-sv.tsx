import { NODE_URL } from "@/env.config";
import NavbarClient from "./navbar";

export default async function Navbar() {
  const res = await fetch(`${NODE_URL}/api/categories`);
  const categories = await res.json();

  // return <NavbarClient categories={categories.data} />;
  return <NavbarClient categories={categories.data} />;
}
