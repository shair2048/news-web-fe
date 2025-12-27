import React, { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { BookmarkIcon, Share2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import envConfig from "@/env.config";

interface ArticleActionButtonProps {
  articleId: object;
  initialIsBookmarked: boolean;
}

export default function ArticleActionButton({
  articleId,
  initialIsBookmarked,
}: ArticleActionButtonProps) {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;

  const [bookmarked, setBookmarked] = useState(initialIsBookmarked);
  const [loading, setLoading] = useState(false);

  const [isCopied, setIsCopied] = useState(false);

  const handleToggleBookmark = async () => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để lưu bài viết!");
      return;
    }

    setLoading(true);

    const previousState = bookmarked;
    setBookmarked(!bookmarked);

    try {
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/articles/bookmark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId }),
        credentials: "include",
      });

      const payload = await res.json();
      console.log("Bookmark status:", bookmarked);

      if (!payload.success) {
        setBookmarked(previousState);
        console.error("Error updating bookmark status");
      }
    } catch (error) {
      setBookmarked(previousState);
      console.error("Network error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      const currentUrl = window.location.href;

      await navigator.clipboard.writeText(currentUrl);

      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <ToggleGroup
      type="multiple"
      variant="outline"
      spacing={2}
      size="sm"
      value={bookmarked ? ["bookmark"] : []}
    >
      <ToggleGroupItem
        value="bookmark"
        aria-label="Toggle bookmark"
        className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500 shadow-none cursor-pointer"
        onClick={handleToggleBookmark}
        disabled={loading}
      >
        <BookmarkIcon />
        {bookmarked ? "Đã lưu" : "Lưu"}
      </ToggleGroupItem>
      <ToggleGroupItem
        value="share"
        aria-label="Toggle share"
        className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500 shadow-none cursor-pointer"
        onClick={handleCopyLink}
        disabled={loading}
      >
        <Share2 />
        {isCopied ? "Đã sao chép" : "Chia sẻ"}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
