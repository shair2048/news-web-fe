import Image from "next/image";

import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "./ui/item";
import Link from "next/link";
import { AspectRatio } from "./ui/aspect-ratio";

export default function OtherArticleItem({
  otherArticles,
}: {
  otherArticles: {
    _id: object;
    title: string;
    description: string;
    imageUrl: string;
    publishedAt: string;
  }[];
}) {
  return otherArticles.map((otherArticle) => (
    <Item variant="default" key={otherArticle._id.toString()} className="w-full h-full">
      <Link href="#" className="group flex flex-col h-full w-full">
        <ItemMedia className="relative w-full transition-opacity duration-200 group-hover:opacity-60">
          {otherArticle.imageUrl && (
            <AspectRatio ratio={16 / 9}>
              <Image
                priority
                fill
                src={otherArticle.imageUrl}
                alt={otherArticle.title}
                className="object-cover"
              />
            </AspectRatio>
          )}
        </ItemMedia>
        <ItemContent className="flex flex-col gap-2 p-4 w-full">
          <ItemTitle className="text-lg text-black line-clamp-2 transition-all duration-200 group-hover:underline">
            {otherArticle.title}
          </ItemTitle>
          <ItemDescription className="line-clamp-2">
            {otherArticle.description}
          </ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  ));
}
