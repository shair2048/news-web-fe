import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BookmarkIcon, ShareIcon } from "lucide-react";
import Image from "next/image";

export default function ArticleDetail({
  articles,
}: {
  articles: {
    _id: object;
    title: string;
    description: string;
    content: string;
    imageUrl: string;
    publishedAt: string;
  };
}) {
  return (
    <div className="py-8 md:py-14 px-4 sm:px-6 max-w-4xl mx-auto">
      <p className="text-xs sm:text-sm text-muted-foreground mb-2">
        {articles.publishedAt}
      </p>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold my-3 md:my-4 leading-tight">
        {articles.title}
      </h1>

      <div className="my-4 md:my-6">
        <ToggleGroup type="multiple" variant="outline" spacing={2} size="sm">
          <ToggleGroupItem
            value="bookmark"
            aria-label="Toggle bookmark"
            className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500 shadow-none"
          >
            <BookmarkIcon />
            Lưu
          </ToggleGroupItem>
          <ToggleGroupItem
            value="share"
            aria-label="Toggle share"
            className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500 shadow-none"
          >
            <ShareIcon />
            Chia sẻ
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <p className="text-sm sm:text-base text-foreground leading-relaxed">
        {articles.description}
      </p>

      <AspectRatio ratio={16 / 9} className="my-6 md:my-8 bg-muted">
        <Image
          priority
          fill={true}
          src={articles.imageUrl}
          alt={articles.title}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 896px, 896px"
        />
      </AspectRatio>

      <div className="space-y-4">
        {articles.content.split("\n\n").map((paragraph, index) => (
          <p key={index} className="text-sm sm:text-base text-foreground leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
