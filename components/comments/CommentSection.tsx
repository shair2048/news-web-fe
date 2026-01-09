"use client";

import { useThreads } from "@liveblocks/react/suspense";
import { Composer, Thread } from "@liveblocks/react-ui";

export function CommentSection() {
  const { threads } = useThreads();

  return (
    <div>
      {threads.map((thread) => (
        <Thread
          key={thread.id}
          thread={thread}
          showResolveAction={false}
          showAttachments={false}
        />
      ))}
      <Composer showAttachments={false} />
    </div>
  );
}
