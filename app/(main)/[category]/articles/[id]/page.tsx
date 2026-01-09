import envConfig from "@/env.config";
import ArticleDetail from "./components/ArticleDetail";
import { cookies } from "next/headers";
import { Room } from "@/components/comments/Room";
import { CommentSection } from "@/components/comments/CommentSection";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const articleDetailRes = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/articles/${id}`
  );

  const payload = await articleDetailRes.json();
  const article = payload.data;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let isBookmarked = false;

  if (token && id) {
    try {
      const bookmarkStatusRes = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/articles/bookmark/status/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      if (bookmarkStatusRes.ok) {
        const bookmarkData = await bookmarkStatusRes.json();
        isBookmarked = bookmarkData.isBookmarked;
      }
    } catch (error) {
      console.error("Error checking bookmark status: ", error);
    }
  }

  return (
    <div className="py-8 md:py-14 px-4 sm:px-6 max-w-4xl mx-auto space-y-15">
      <ArticleDetail article={article} initialIsBookmarked={isBookmarked} />
      <div className="space-y-4">
        <h2 className="text-sm sm:text-lg md:text-xl font-bold leading-tight">
          Bình luận
        </h2>
        <Room roomId={`article-${id}`}>
          <CommentSection />
        </Room>
      </div>
    </div>
  );
}
