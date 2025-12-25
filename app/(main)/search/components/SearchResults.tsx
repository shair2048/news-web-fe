"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Search,
  ChevronsLeft,
  ChevronsRight,
  AudioLines,
  Loader2,
  Mic,
} from "lucide-react";
import PaginationNumbers from "@/components/PaginationNumbers";
import { useState } from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useVoiceSearch } from "@/hooks/use-voice-search";

interface Article {
  _id: object;
  title: string;
  description: string;
  imageUrl: string;
  publishedAt: string;
  category: {
    _id: object;
    name: string;
    slug: string;
  };
}

interface SearchProps {
  keyword: string;
  articles: Article[];
  currentPage: number;
  totalPages: number;
}

export default function SearchResults({
  keyword,
  articles,
  currentPage,
  totalPages,
}: SearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(keyword ?? "");

  const { isRecording, isProcessing, startRecording, stopRecording } = useVoiceSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim()) return;

    executeSearch(value.trim());
  };

  const executeSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("q", term);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handleVoiceClick = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording((res) => {
        if (res && res.success) {
          const voiceKeyword = res.voice_interpreted.raw_keywords || res.keyword;
          if (voiceKeyword) {
            setValue(voiceKeyword);
            executeSearch(voiceKeyword);
          }
        }
      });
    }
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl p-10 mx-auto">
      <div className="flex gap-2">
        <form id="search-form" onSubmit={handleSearch} className="w-full">
          <Input
            placeholder="Tìm kiếm..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mb-4"
            disabled={isProcessing}
          />
        </form>
        <Button
          variant={isRecording ? "destructive" : "outline"}
          size="icon"
          type="button"
          onClick={handleVoiceClick}
          disabled={isProcessing}
          className={isRecording ? "animate-pulse" : ""}
        >
          {isProcessing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isRecording ? (
            <Mic className="h-4 w-4" />
          ) : (
            <AudioLines className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="default"
          size="icon"
          form="search-form"
          className="cursor-pointer"
        >
          <Search />
        </Button>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <Item key={article._id.toString()} variant="default" size="default">
            <Link
              href={`/${article.category.slug}/articles/${article._id}`}
              className="flex gap-4 group h-full w-full"
            >
              <ItemMedia className="relative w-1/3 flex-shrink-0 transition-opacity duration-200 group-hover:opacity-60">
                {article.imageUrl && (
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      priority
                      fill
                      src={article.imageUrl}
                      alt={article.title}
                      className="object-cover"
                    />
                  </AspectRatio>
                )}
              </ItemMedia>
              <ItemContent className="flex flex-col gap-2 p-4 flex-1">
                <ItemTitle className="text-lg text-black line-clamp-2 transition-all duration-200 group-hover:underline">
                  {article.title}
                </ItemTitle>
                <ItemDescription className="line-clamp-2">
                  {article.description}
                </ItemDescription>
              </ItemContent>
            </Link>
          </Item>
        ))}

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
    </div>
  );
}
