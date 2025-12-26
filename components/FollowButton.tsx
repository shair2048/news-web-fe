"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import envConfig from "@/env.config";

interface FollowButtonProps {
  categoryId: object;
  initialIsFollowed: boolean;
}

export default function FollowButton({
  categoryId,
  initialIsFollowed,
}: FollowButtonProps) {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;

  const [followed, setFollowed] = useState(initialIsFollowed);
  const [loading, setLoading] = useState(false);

  const handleToggleFollow = async () => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để theo dõi!");
      return;
    }

    setLoading(true);

    const previousState = followed;
    setFollowed(!followed);

    try {
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/categories/follow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryId }),
        credentials: "include",
      });

      const payload = await res.json();

      if (!payload.success) {
        setFollowed(previousState);
        console.error("Error updating follow status");
      }
    } catch (error) {
      setFollowed(previousState);
      console.error("Network error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return followed ? (
    <Button
      variant="secondary"
      className="hidden md:flex items-center gap-2 cursor-pointer"
      onClick={handleToggleFollow}
      disabled={loading}
    >
      Đã theo dõi
    </Button>
  ) : (
    <Button
      variant="outline"
      className="hidden md:flex items-center gap-2 cursor-pointer"
      onClick={handleToggleFollow}
      disabled={loading}
    >
      Theo dõi chuyên mục
    </Button>
  );
}
