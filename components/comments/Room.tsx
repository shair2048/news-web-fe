"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { authLiveblocksAction, resolveUsersAction } from "@/actions/liveblocks.action";
import { LiveblocksUiConfig } from "@liveblocks/react-ui";
import { CommentThreadSkeletonCard } from "../CommentThreadSkeletonCard";

interface RoomProps {
  children: ReactNode;
  roomId: string;
}

export function Room({ children, roomId }: RoomProps) {
  return (
    <LiveblocksProvider
      authEndpoint={async (room) => {
        if (!room) {
          throw new Error("Room ID is required for authentication");
        }

        const response = await authLiveblocksAction(room);

        return response;
      }}
      resolveUsers={async ({ userIds }) => {
        const resolvedUsers = await resolveUsersAction(userIds);
        return resolvedUsers;
      }}
    >
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<CommentThreadSkeletonCard />}>
          <LiveblocksUiConfig
            overrides={{
              // locale: "vi",

              COMPOSER_PLACEHOLDER: "Viết bình luận...",
              THREAD_COMPOSER_PLACEHOLDER: "Viết câu trả lời...",
              COMPOSER_SEND: "Gửi",
              COMMENT_EDIT: "Chỉnh sửa bình luận",
              COMMENT_DELETE: "Xóa bình luận",
              COMMENT_EDITED: "(đã chỉnh sửa)",
              COMMENT_DELETED: "Bình luận này đã bị xóa",
              THREAD_RESOLVE: "Đánh dấu đã xong",
              THREAD_UNRESOLVE: "Mở lại",
              THREAD_NEW_INDICATOR: "Mới",
              THREAD_NEW_INDICATOR_DESCRIPTION: "Bình luận mới kể từ lần cuối bạn xem",
            }}
          >
            {children}
          </LiveblocksUiConfig>
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
