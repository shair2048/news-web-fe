"use client";

import { removeTokenCookie } from "@/actions/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import envConfig from "@/env.config";
import { useAuthStore } from "@/store/useAuthStore";
import {
  ChevronUp,
  Home,
  MessagesSquare,
  Settings,
  User2,
  UsersRound,
} from "lucide-react";
import { useRouter } from "next/navigation";

const items = [
  {
    title: "Trang chủ",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Quản lý tài khoản",
    url: "/dashboard/users",
    icon: UsersRound,
  },
  {
    title: "Quản lý bình luận",
    url: "#",
    icon: MessagesSquare,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const router = useRouter();

  const { user, logout } = useAuthStore();

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
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Danh mục</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="cursor-pointer">
                  <User2 /> {user?.name}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="end"
                className="w-[--radix-popper-anchor-width] "
              >
                {/* <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem> */}
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
