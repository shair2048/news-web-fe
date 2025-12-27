import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import Image from "next/image";
import Link from "next/link";

interface Article {
  _id: object;
  title: string;
  description: string;
  imageUrl: string;
  category: {
    _id: object;
    slug: string;
  };
}

interface ArticlesSavedProps {
  count: number;
  bookmarkedArticles: Article[];
}

export default function ArticlesSaved({ count, bookmarkedArticles }: ArticlesSavedProps) {
  return (
    <div className="w-full max-w-4xl p-10 mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{count} bài báo đã lưu</h1>
      <div className="space-y-4">
        {bookmarkedArticles.map((bookmarked) => (
          <Item key={bookmarked._id.toString()} variant="default" size="default">
            <Link
              href={`/${bookmarked.category.slug}/articles/${bookmarked._id}`}
              className="flex gap-4 group h-full w-full"
            >
              <ItemMedia className="relative w-1/3 flex-shrink-0 transition-opacity duration-200 group-hover:opacity-60">
                {bookmarked.imageUrl && (
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      priority
                      fill
                      src={bookmarked.imageUrl}
                      alt={bookmarked.title}
                      className="object-cover"
                    />
                  </AspectRatio>
                )}
              </ItemMedia>
              <ItemContent className="flex flex-col gap-2 p-4 flex-1">
                <ItemTitle className="text-lg text-black line-clamp-2 transition-all duration-200 group-hover:underline">
                  {bookmarked.title}
                </ItemTitle>
                <ItemDescription className="line-clamp-2">
                  {bookmarked.description}
                </ItemDescription>
              </ItemContent>
            </Link>
          </Item>
        ))}
      </div>
    </div>
  );
}
