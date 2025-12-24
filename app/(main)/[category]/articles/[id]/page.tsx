import envConfig from "@/env.config";
import ArticleDetail from "./components/ArticleDetail";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/articles/${id}`);

  const article = await res.json();

  return <ArticleDetail article={article.data} />;
}
