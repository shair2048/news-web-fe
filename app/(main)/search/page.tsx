import envConfig from "@/env.config";
import Search from "./components/Search";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string; page: string; limit: string }>;
}) {
  const { q, page: pageParam } = await searchParams;
  const currentPage = Number(pageParam) || 1;
  const limit = 15;

  const res = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/search?q=${encodeURI(
      q
    )}&page=${currentPage}&limit=${limit}`,
    { cache: "no-store" }
  );
  const articles = await res.json();

  return (
    <Search
      keyword={q}
      articles={articles.data}
      currentPage={articles.currentPage}
      totalPages={articles.totalPages}
    />
  );
}
