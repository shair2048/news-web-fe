"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./navigation-menu";
import { Button } from "./button";
import { Input } from "./input";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar({
  categories,
}: {
  categories: { slug: string; name: string }[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim()) return;

    router.push(`/search?q=${encodeURIComponent(value.trim())}`);
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 border-b border-gray-100 mx-auto px-4">
        <div className="flex-shrink-0">
          <Link href="/" className="text-xl font-bold ">
            news
          </Link>
        </div>

        <div className="flex items-center gap-4 relative">
          {/* Search button */}
          {!open && (
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
              <Search className="w-5 h-5" />
            </Button>
          )}

          {open && (
            <form
              onSubmit={handleSubmit}
              className="relative hidden md:block cursor-pointer"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                ref={inputRef}
                type="search"
                placeholder="Tìm kiếm..."
                className="pl-10 w-64 lg:w-80"
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => setOpen(false)}
              />
            </form>
          )}

          <Button
            className="hidden md:flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/sign-in")}
          >
            Đăng nhập
          </Button>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center h-12">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/">Trang chủ</NavigationMenuLink>
            </NavigationMenuItem>
            {categories.map((category) => (
              <NavigationMenuItem key={category.name}>
                <NavigationMenuLink href={`/${category.slug}`}>
                  {category.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
