"use client";

import { Calendar, ChevronsLeft, ChevronsRight } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationNumbers from "@/components/ui/PaginationNumbers";

export default function Category({
  articles,
  currentPage,
  totalPages,
}: {
  articles: {
    _id: object;
    title: string;
    description: string;
    imageUrl: string;
    publishedAt: string;
  }[];
  currentPage: number;
  totalPages: number;
}) {
  const featuredArticle = articles[0];
  const smallArticles = articles.slice(1, 3);
  const otherArticles = articles.slice(3);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white from-slate-50 to-slate-100 px-12 gap-4 flex flex-col gap-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center">
        {/* <h2 className="text-3xl font-bold text-slate-900">Công nghệ</h2> */}
      </div>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden border hover:bg-opacity-100 transition-shadow">
            <div className="relative h-96">
              {featuredArticle.imageUrl ? (
                <div className="w-40 h-full flex-shrink-0 overflow-hidden">
                  <Image
                    priority
                    fill={true}
                    src={featuredArticle.imageUrl}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              ) : (
                <div className="w-40 h-full bg-gray-200" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-3xl font-bold mb-3 leading-tight group-hover:text-blue-600">
                  {featuredArticle.title}
                </h2>
                <p className="text-slate-200 mb-4 text-lg">
                  {featuredArticle.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />{" "}
                      {featuredArticle.publishedAt}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          {smallArticles.map((article) => (
            <Card
              key={article._id.toString()}
              className="overflow-hidden cursor-pointer group flex flex-row h-40"
            >
              {article.imageUrl ? (
                <div className="w-40 h-full flex-shrink-0 overflow-hidden">
                  <Image
                    priority
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    width={800}
                    height={500}
                  />
                </div>
              ) : (
                <div className="w-40 h-full bg-gray-200" />
              )}

              <CardHeader className="p-1 flex flex-col justify-center flex-1">
                <CardTitle className="text-base font-semibold line-clamp-2 group-hover:text-blue-600 transition">
                  {article.title}
                </CardTitle>

                <CardDescription className="text-sm line-clamp-2 mt-1 text-slate-600">
                  {article.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {otherArticles.map((article) => (
          <Card
            key={article._id.toString()}
            className="overflow-hidden cursor-pointer group"
          >
            {article.imageUrl ? (
              <div className="relative h-48 overflow-hidden">
                <Image
                  priority
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  width={800}
                  height={500}
                />
              </div>
            ) : (
              <div className="relative h-48 bg-gray-200" />
            )}

            <CardHeader>
              <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition">
                {article.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {article.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 mb-20">
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
