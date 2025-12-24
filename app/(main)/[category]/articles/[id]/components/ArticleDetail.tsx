"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import envConfig from "@/env.config";
import { BookmarkIcon, Loader2, ShareIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface ArticleDetailProps {
  article: {
    _id: object;
    title: string;
    description: string;
    content: string;
    imageUrl: string;
    publishedAt: string;
  };
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  const [summary, setSummary] = useState<{
    status: string;
    text?: string;
  } | null>(null);

  const [isFetching, setIsFetching] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSummary = async () => {
    try {
      const res = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/articles/${article._id}/summarize`,
        {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        console.error("Server Status:", res.status);

        const errorData = await res.json();
        console.error("Error Message:", errorData.message);
        console.error("Error Detail:", errorData.error);

        setSummary({ status: "failed", text: errorData.message });
        return;
      }

      const json = await res.json();
      const summaryData = json.data.summary;

      setSummary(summaryData);

      if (summaryData.status === "pending") {
        timerRef.current = setTimeout(fetchSummary, 3000);
      } else {
        setIsFetching(false);
      }
    } catch (error) {
      console.error(error);
      setSummary({ status: "failed" });
      setIsFetching(false);
    }
  };

  const handleAccordionChange = (value: string) => {
    if (value === "item" && !summary && !isFetching) {
      setIsFetching(true);
      setSummary({ status: "pending" });
      fetchSummary();
    }
  };

  return (
    <div className="py-8 md:py-14 px-4 sm:px-6 max-w-4xl mx-auto">
      <p className="text-xs sm:text-sm text-muted-foreground mb-2">
        {article.publishedAt}
      </p>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold my-3 md:my-4 leading-tight">
        {article.title}
      </h1>

      <div className="my-4 md:my-6">
        <ToggleGroup type="multiple" variant="outline" spacing={2} size="sm">
          <ToggleGroupItem
            value="bookmark"
            aria-label="Toggle bookmark"
            className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500 shadow-none cursor-pointer"
          >
            <BookmarkIcon />
            Lưu
          </ToggleGroupItem>
          <ToggleGroupItem
            value="share"
            aria-label="Toggle share"
            className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500 shadow-none cursor-pointer"
          >
            <ShareIcon />
            Chia sẻ
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        onValueChange={handleAccordionChange}
      >
        <AccordionItem value="item">
          <AccordionTrigger className="cursor-pointer">Tóm tắt nội dung</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-sm sm:text-base text-foreground italic leading-relaxed ">
            {(isFetching || summary?.status === "pending") && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="animate-spin h-4 w-4" />
                <span>Đang phân tích bài báo bằng AI...</span>
              </div>
            )}

            {summary?.status === "completed" && !isFetching && (
              <div className="animate-in fade-in duration-500">
                <p>{summary.text}</p>
              </div>
            )}

            {summary?.status === "failed" && (
              <p className="text-destructive">
                Không thể tạo bản tóm tắt vào lúc này. Vui lòng thử lại sau.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <p className="text-sm sm:text-base text-foreground leading-relaxed font-medium">
        {article.description}
      </p>

      {article.imageUrl && (
        <AspectRatio ratio={16 / 9} className="my-6 md:my-8 bg-muted">
          <Image
            priority
            fill={true}
            src={article.imageUrl}
            alt={article.title}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 896px, 896px"
          />
        </AspectRatio>
      )}

      <div className="space-y-4">
        {article.content.split("\n\n").map((paragraph, index) => (
          <p key={index} className="text-sm sm:text-base text-foreground leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
