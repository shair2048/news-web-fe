import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { BookmarkIcon, Share2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { toggleBookmarkAction } from "@/actions/bookmark.action";

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
      alert("Cần đăng nhập để sử dụng tính năng này!");
      return;
    }

    setLoading(true);

    const previousState = bookmarked;
    setBookmarked(!bookmarked);

    try {
      const result = await toggleBookmarkAction(articleId as object);

      if (!result.success) {
        setBookmarked(previousState);
        console.error(result.message);
      } else {
        console.log("Bookmark toggled successfully");
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
