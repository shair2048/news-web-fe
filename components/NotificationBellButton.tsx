"use client";

import { useState } from "react";
import useSWR from "swr";
import { Bell } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import envConfig from "@/env.config";
import { markNotificationAsRead } from "@/actions/notification";

interface Notification {
  _id: object;
  message: string;
  isRead: boolean;
  createdAt: string;
  category: {
    _id: object;
    slug: string;
  };
  article: {
    _id: object;
    title: string;
    description: string;
  };
}

interface NotificationAPIResponse {
  notifications: Notification[];
  unreadCount: number;
}

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

export default function NotificationBellButton() {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, mutate } = useSWR<NotificationAPIResponse>(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/notifications`,
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    }
  );

  const notifications = data?.notifications || [];
  const unreadCount = data?.unreadCount || 0;

  const handleNotificationClick = async (notificationId: string, isRead: boolean) => {
    setIsOpen(false);

    if (!isRead) {
      markNotificationAsRead(notificationId).then((res) => {
        if (res.success) {
          mutate();
        }
      });
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 flex h-2.5 w-2.5 translate-x-1/2 -translate-y-1/2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h4 className="font-semibold">Thông báo</h4>
          {unreadCount > 0 && (
            <span className="text-xs text-muted-foreground">{unreadCount} chưa đọc</span>
          )}
        </div>

        <ScrollArea className="h-[300px]">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Đang tải...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground flex flex-col items-center gap-2">
              <Bell className="w-8 h-8 opacity-20" />
              <p>Không có thông báo mới</p>
            </div>
          ) : (
            <div className="grid">
              {notifications.map((notif: Notification) => (
                <Link
                  key={notif._id.toString()}
                  href={`/${notif.category.slug}/articles/${notif.article._id}`}
                  onClick={() =>
                    handleNotificationClick(notif._id.toString(), notif.isRead)
                  }
                  className={`flex flex-col gap-1 p-4 text-sm hover:bg-muted transition-colors border-b last:border-0 ${
                    !notif.isRead ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-medium line-clamp-2">{notif.message}</span>
                    {!notif.isRead && (
                      <span className="h-2 w-2 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
                    )}
                  </div>

                  {/* Render thông tin phụ */}
                  {/* {notif.category && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {notif.category.name || notif.category.slug}
                    </div>
                  )} */}
                </Link>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="p-2 border-t text-center">
          <Button variant="ghost" size="sm" className="w-full text-xs h-8">
            Xem tất cả
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
