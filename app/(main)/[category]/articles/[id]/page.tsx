import envConfig from "@/env.config";
import ArticleDetail from "./components/ArticleDetail";
import { cookies } from "next/headers";

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

  return <ArticleDetail article={article} initialIsBookmarked={isBookmarked} />;
}
