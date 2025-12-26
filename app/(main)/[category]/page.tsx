import envConfig from "@/env.config";
import Category from "./components/Category";
import { cookies } from "next/headers";

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

  const articleRes = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/categories/${category}/articles?page=${page}&limit=${limit}`,
    { cache: "no-store" }
  );

  if (!articleRes.ok) {
    return <div>Category not found</div>;
  }

  const payload = await articleRes.json();
  const categoryId = payload.categoryId;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let isFollowed = false;

  if (token && categoryId) {
    try {
      const followRes = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/categories/follow/status/${categoryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      if (followRes.ok) {
        const followData = await followRes.json();
        isFollowed = followData.isFollowed;
      }
    } catch (error) {
      console.error("Error checking follow status: ", error);
    }
  }

  return (
    <Category
      articles={payload.data}
      categorySlug={category}
      currentPage={payload.currentPage}
      totalPages={payload.totalPages}
      categoryName={payload.categoryName}
      categoryId={categoryId}
      initialIsFollowed={isFollowed}
    />
  );
}
