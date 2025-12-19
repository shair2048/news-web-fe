import { NODE_URL } from "@/env.config";
import Category from "./components/Category";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page: string; limit: string }>;
}) {
  const { category } = await params;
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;
  const limit = 15;

  const res = await fetch(
    `${NODE_URL}/api/categories/${category}/articles?page=${page}&limit=${limit}`,
    { cache: "no-store" }
  );
  const articles = await res.json();

  return (
    <Category
      articles={articles.data}
      categorySlug={category}
      currentPage={articles.currentPage}
      totalPages={articles.totalPages}
    />
  );
}
