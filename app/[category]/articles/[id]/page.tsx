import { NODE_URL } from "@/env.config";
import ArticleDetail from "./components/ArticleDetail";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page: string; limit: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${NODE_URL}/api/articles/${id}`);

  const articles = await res.json();

  return <ArticleDetail articles={articles.data} />;
}
