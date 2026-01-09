"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { authLiveblocksAction, resolveUsersAction } from "@/actions/liveblocks.action";

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
        <ClientSideSuspense fallback={<div>Loading…</div>}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
