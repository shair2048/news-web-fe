import { Item, ItemContent, ItemDescription, ItemTitle } from "./ui/item";
import Link from "next/link";

export default function SideArticleItem({
  sideArticles,
}: {
  sideArticles: {
    _id: object;
    title: string;
    description: string;
    imageUrl: string;
    publishedAt: string;
  }[];
}) {
  return sideArticles.map((sideArticle) => (
    <Item variant="default" key={sideArticle._id.toString()} className="w-full h-full">
      <Link href="#" className="group flex h-full w-full">
        <ItemContent className="flex flex-col gap-2 p-4 w-full">
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
