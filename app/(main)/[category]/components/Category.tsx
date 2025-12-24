"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PaginationNumbers from "@/components/PaginationNumbers";
import FeatureArticleItem from "@/components/FeatureArticleItem";
import OtherArticleItem from "@/components/OtherArticleItem";
import SideArticleItem from "@/components/SideArticleItem";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

interface CategoryProps {
  articles: {
    _id: object;
    title: string;
    description: string;
    imageUrl: string;
    publishedAt: string;
  }[];
  categorySlug: string;
  currentPage: number;
  totalPages: number;
}

export default function Category({
  articles,
  categorySlug,
  currentPage,
  totalPages,
}: CategoryProps) {
  const articlesWithImage = articles.filter((article) => article.imageUrl);
  const articlesWithoutImage = articles.filter((article) => !article.imageUrl);

  const featureArticle = articlesWithImage[0];

  const sideArticles = articlesWithoutImage.slice(0, 3);

  const otherArticles = articles.filter(
    (article) =>
      article._id !== featureArticle?._id &&
      !sideArticles.some((sideArticle) => sideArticle._id === article._id)
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-4 p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 auto-rows-min">
        <div className="bg-white md:col-span-2 md:row-span-3">
          <FeatureArticleItem featureArticle={featureArticle} category={categorySlug} />
        </div>

        <div className="flex flex-col items-center justify-center text-white">
          <SideArticleItem sideArticles={sideArticles} categorySlug={categorySlug} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 auto-rows-min">
        <OtherArticleItem otherArticles={otherArticles} categorySlug={categorySlug} />
      </div>

      <div className="my-10">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="cursor-pointer"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>

            <PaginationNumbers
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />

            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="cursor-pointer"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
