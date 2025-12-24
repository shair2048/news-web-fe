import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Link from "next/link";

interface ArticleSliderProps {
  articles: {
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
  }[];
}

export default function ArticleSlider({ articles }: ArticleSliderProps) {
  return (
    <Carousel>
      <CarouselContent>
        {articles.map((article, index) => (
          <CarouselItem key={index}>
            <Link href={`/${article.category.slug}/articles/${article._id}`}>
              <div className="relative w-full h-full min-h-[400px] md:min-h-[600px]">
                <Image
                  priority
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10">
                  <h1 className="text-xl md:text-3xl font-bold mb-3">{article.title}</h1>
                  <p className="text-gray-200 text-base md:text-lg">
                    {article.description}
                  </p>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-4 bg-white/90 hover:bg-white border-0 shadow-lg" />
      <CarouselNext className="right-4 bg-white/90 hover:bg-white border-0 shadow-lg" />
    </Carousel>
  );
}
