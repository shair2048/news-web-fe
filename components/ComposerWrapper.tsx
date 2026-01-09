import { useSelf } from "@liveblocks/react/suspense";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback } from "react";
import { toast } from "sonner";

interface ComposerWrapperProps {
  children: ReactNode;
}

export function ComposerWrapper({ children }: ComposerWrapperProps) {
  const router = useRouter();

  const user = useSelf((me) => me.info);

  const isGuest = user?.isGuest;

  const handleInteract = useCallback(
    (e: React.MouseEvent | React.FocusEvent) => {
      if (isGuest) {
        e.preventDefault();
        e.stopPropagation();

        toast("Bạn cần đăng nhập để bình luận", {
          action: {
            label: "Đăng nhập",
            onClick: () => router.push("/sign-in"),
          },
          duration: 4000,
        });
      }
    },
    [isGuest, router]
  );

  return (
    <div
      onClickCapture={handleInteract}
      onFocusCapture={handleInteract}
      className={isGuest ? "cursor-not-allowed" : ""}
    >
      <div className={isGuest ? "pointer-events-none opacity-60" : ""}>{children}</div>
    </div>
  );
}
