import envConfig from "@/env.config";
import ArticleSlider from "@/components/ArticleSlider";
import SideArticleItem from "@/components/SideArticleItem";
import Link from "next/link";
import OtherArticleItem from "@/components/OtherArticleItem";

interface Category {
  _id: object;
  name: string;
  slug: string;
}

interface Article {
  _id: object;
  title: string;
  description: string;
  imageUrl: string;
  publishedAt: string;
  category: Category;
}

interface CategoryPreview {
  _id: object;
  categoryName: string;
  categorySlug: string;
  articles: Article[];
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export default async function HomePage() {
  const daysCount = 3;
  const limitItems = 8;

  const [latestArticleRes, categoriesRes] = await Promise.all([
    fetch(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/articles/latest?days=${daysCount}&limit=${limitItems}&hasImage=true`,
      {
        cache: "no-store",
      }
    ),
    fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/categories/articles/preview`, {
      cache: "no-store",
    }),
  ]);

  const latestArticlesResJson = (await latestArticleRes.json()) as ApiResponse<Article[]>;
  const latestArticles = latestArticlesResJson.data;

  const articlesPreviewResJson = (await categoriesRes.json()) as ApiResponse<
    CategoryPreview[]
  >;
  const articlesPreview = articlesPreviewResJson.data;

  const featureArticles = latestArticles.slice(0, 4);
  const sideArticles = latestArticles.slice(4);

  return (
    <div className="space-y-8 p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 auto-rows-min">
        <div className="md:col-span-2 md:row-span-3">
          <ArticleSlider articles={featureArticles} />
        </div>

        <div className="flex flex-col items-center justify-center">
          {sideArticles.map((sideArticle, index) => (
            <SideArticleItem
              key={index}
              sideArticles={[sideArticle]}
              categorySlug={sideArticle.category.slug}
            />
          ))}
        </div>
      </div>
      {articlesPreview.map((preview) => (
        <div key={preview._id.toString()}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold truncate">
              {preview.categoryName}
            </h2>
            <Link
              href={`/${preview.categorySlug}/`}
              className="text-sm md:text-base hover:underline whitespace-nowrap flex-shrink-0"
            >
              Xem thêm
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 auto-rows-min">
            <OtherArticleItem
              otherArticles={preview.articles}
              categorySlug={preview.categorySlug}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
