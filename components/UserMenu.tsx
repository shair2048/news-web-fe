import { removeTokenCookie } from "@/actions/auth";
import envConfig from "@/env.config";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { BookmarkCheck, LogOut } from "lucide-react";
import { User } from "@/types/user.type";

export default function UserMenu({ currentUser }: { currentUser: User | null }) {
  const router = useRouter();

  const { user: clientUser, logout } = useAuthStore();

  const userToRender = currentUser || clientUser;

  const handleBookmarkNavigate = () => {
    router.push("/bookmarked");
  };

  const handleLogout = async () => {
    try {
      await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/sign-out`, {
        method: "POST",
        credentials: "include",
      });

      removeTokenCookie();

      logout();

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return userToRender ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userToRender.avatar || ""} alt={userToRender.name} />
            {/* <AvatarFallback>{getInitials(userToRender.name)}</AvatarFallback> */}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userToRender.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userToRender.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleBookmarkNavigate} className="cursor-pointer">
          <BookmarkCheck className="mr-2 h-4 w-4" />
          <span>Bookmarks</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 focus:text-red-600 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button
      className="hidden md:flex items-center gap-2 cursor-pointer"
      onClick={() => router.push("/sign-in")}
    >
      Đăng nhập
    </Button>
  );
}
