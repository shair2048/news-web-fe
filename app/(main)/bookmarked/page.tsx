import envConfig from "@/env.config";
import { cookies } from "next/headers";
import ArticlesSaved from "./components/ArticlesSaved";

export default async function BookmarkPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const bookmarkedRes = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/articles/bookmarked`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const payload = await bookmarkedRes.json();

  return <ArticlesSaved count={payload.count} bookmarkedArticles={payload.bookmarks} />;
}
