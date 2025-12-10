"use client";

import Link from "next/link";
import { Search, User } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./navigation-menu";
import { Button } from "./button";
import { Input } from "./input";

export default function Navbar({
  categories,
}: {
  categories: { slug: string; name: string }[];
}) {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 border-b border-gray-100 mx-auto px-4">
        {/* <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu điều hướng</SheetTitle>
                <SheetDescription>Chọn danh mục bạn muốn xem</SheetDescription>
              </SheetHeader>
              <div className="px-4 py-4 space-y-3">
                <Link
                  href="/"
                  className="block py-2 text-gray-700 hover:text-orange-500 transition font-bold"
                >
                  Trang chủ
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/${category.slug}`}
                    className="block py-2 text-gray-700 hover:text-orange-500 transition font-bold"
                  >
                    {category.name}
                  </Link>
                ))}
                <div className="flex flex-col pt-2">
                  <Button variant="outline" className="w-full">
                    <User className="w-5 h-5 mr-2" />
                    Sign In
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div> */}

        <div className="flex-shrink-0">
          <Link href="/" className="text-xl font-bold ">
            news
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Tìm kiếm..."
              className="pl-10 w-64 lg:w-80"
            />
          </div>

          <Button className="hidden md:flex items-center gap-2">
            <User className="w-4 h-4" />
            Sign In
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
