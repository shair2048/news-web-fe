import { Item, ItemContent, ItemDescription, ItemTitle } from "./ui/item";
import Link from "next/link";

interface SideArticleItemProps {
  sideArticles: {
    _id: object;
    title: string;
    description: string;
    imageUrl: string;
    publishedAt: string;
  }[];
  categorySlug: string;
}

export default function SideArticleItem({
  sideArticles,
  categorySlug,
}: SideArticleItemProps) {
  return sideArticles.map((sideArticle) => (
    <Item variant="default" key={sideArticle._id.toString()} className="w-full h-full ">
      <Link
        href={`/${categorySlug}/articles/${sideArticle._id}`}
        className="group flex h-full w-full"
      >
        <ItemContent className="flex flex-col gap-2 p-4">
          <ItemTitle className="text-lg text-black line-clamp-2 transition-all duration-200 group-hover:underline">
            {sideArticle.title}
          </ItemTitle>
          <ItemDescription className="line-clamp-2">
            {sideArticle.description}
          </ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  ));
}
