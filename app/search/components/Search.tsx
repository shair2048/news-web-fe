"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import PaginationNumbers from "@/components/ui/PaginationNumbers";
import { useState } from "react";

export default function Search({
  keyword,
  articles,
  currentPage,
  totalPages,
}: {
  keyword: string;
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(keyword ?? "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim()) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("q", value.trim());
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-4 px-4">
      <form onSubmit={handleSearch}>
        <Input
          placeholder="Tìm kiếm..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mb-4"
        />
      </form>

      <div className="space-y-4">
        {articles.map((article) => (
          <Card key={article._id.toString()} className="group">
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Image Container */}
                <div className="relative w-full sm:w-56 md:w-64 lg:w-72 flex-shrink-0">
                  <div className="relative aspect-[16/9] w-full">
                    {article.imageUrl ? (
                      <Image
                        priority
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        sizes="(max-width: 640px) 128px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                        className="object-cover transition-opacity duration-300 group-hover:opacity-60"
                      />
                    ) : (
                      <div className="w-40 h-full bg-gray-200" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center">
                  <CardHeader className="p-0 space-y-2">
                    <CardTitle className="text-lg sm:text-xl line-clamp-2 group-hover:underline cursor-pointer transition-all duration-200">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
                      {article.description}
                    </CardDescription>
                  </CardHeader>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

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
