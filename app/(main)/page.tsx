import { NEXT_PUBLIC_NODE_URL } from "@/env.config";
import Home from "./Home";

export default async function HomePage() {
  const daysCount = 3;
  const limitItems = 8;

  const [latestArticleRes, categoriesRes] = await Promise.all([
    fetch(
      `${NEXT_PUBLIC_NODE_URL}/api/articles/latest?days=${daysCount}&limit=${limitItems}&hasImage=true`,
      {
        cache: "no-store",
      }
    ),
    fetch(`${NEXT_PUBLIC_NODE_URL}/api/categories/articles/preview`, {
      cache: "no-store",
    }),
  ]);

  const latestArticles = await latestArticleRes.json();
  const articlesPreview = await categoriesRes.json();

  return (
    <Home latestArticles={latestArticles.data} articlesPreview={articlesPreview.data} />
  );
}
