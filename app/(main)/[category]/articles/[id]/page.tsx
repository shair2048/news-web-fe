import { NEXT_PUBLIC_NODE_URL } from "@/env.config";
import ArticleDetail from "./components/ArticleDetail";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${NEXT_PUBLIC_NODE_URL}/articles/${id}`);

  const article = await res.json();

  return <ArticleDetail article={article.data} />;
}
