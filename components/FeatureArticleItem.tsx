import Image from "next/image";

import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "./ui/item";
import Link from "next/link";
import { AspectRatio } from "./ui/aspect-ratio";

export default function FeatureArticleItem({
  featureArticle,
  category,
}: {
  featureArticle: {
    _id: object;
    title: string;
    description: string;
    imageUrl: string;
    publishedAt: string;
  };
  category: string;
}) {
  return (
    <Item variant="default" className="w-full h-full">
      <Link
        href={`/${category}/articles/${featureArticle._id}`}
        className="group flex flex-col h-full w-full"
      >
        <ItemMedia className=" relative w-full transition-opacity duration-200 group-hover:opacity-60">
          {featureArticle.imageUrl && (
            <AspectRatio ratio={16 / 7}>
              <Image
                priority
                fill={true}
                src={featureArticle.imageUrl}
                alt={featureArticle.title}
                className="object-cover"
              />
            </AspectRatio>
          )}
        </ItemMedia>
        <ItemContent className="flex flex-col gap-2 p-4 w-full">
          <ItemTitle className="text-2xl text-black line-clamp-2 transition-all duration-200 group-hover:underline">
            {featureArticle.title}
          </ItemTitle>
          <ItemDescription className="line-clamp-2">
            {featureArticle.description}
          </ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  );
}
