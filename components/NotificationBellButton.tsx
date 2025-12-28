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
import { notificationFetcher } from "@/services/notification.service";

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

interface NotificationBellButtonProps {
  accessToken?: string;
}

export default function NotificationBellButton({
  accessToken,
}: NotificationBellButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, mutate } = useSWR(
    accessToken
      ? [`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/notifications`, accessToken]
      : null,
    notificationFetcher,
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
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 flex h-2.5 w-2.5 translate-x-1/2 -translate-y-1/2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b px-4 py-2">
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
            <div className="flex flex-col items-center gap-2 p-8 text-center text-sm text-muted-foreground">
              <Bell className="h-8 w-8 opacity-20" />
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
                  className={`flex flex-col gap-1 border-b p-4 text-sm transition-colors last:border-0 hover:bg-muted ${
                    !notif.isRead ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="line-clamp-2 font-medium">{notif.message}</span>
                    {!notif.isRead && (
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="border-t p-2 text-center">
          <Button variant="ghost" size="sm" className="h-8 w-full text-xs">
            Xem tất cả
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
