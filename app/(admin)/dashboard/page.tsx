import { ChartBarHorizontal } from "@/components/ChartBarHorizontal";
import { ChartPieLabel } from "@/components/ChartPieLabel";
import DashboardStats from "@/components/DashboardStats";
import envConfig from "@/env.config";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let crawledArticlesNumber = 0;
  let newUsersTodayNumber = 0;
  let summarizedArticlesNumber = 0;
  let articlesBySource = [];

  if (token) {
    try {
      const [
        crawledArticlesRes,
        newUsersTodayRes,
        summarizedArticlesRes,
        articlesBySourceStatsRes,
      ] = await Promise.all([
        fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/articles/stats/crawled-articles`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }),

        fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/users/stats/new-users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }),

        fetch(
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/articles/stats/summarized-articles`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        ),

        fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/articles/stats/sources`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }),
      ]);

      if (crawledArticlesRes.ok) {
        const payload = await crawledArticlesRes.json();
        crawledArticlesNumber = payload.data.todayTotal;
      }
      if (newUsersTodayRes.ok) {
        const payload = await newUsersTodayRes.json();
        newUsersTodayNumber = payload.data.newUsersToday;
      }

      if (summarizedArticlesRes.ok) {
        const payload = await summarizedArticlesRes.json();
        summarizedArticlesNumber = payload.data.todayCount;
      }

      if (articlesBySourceStatsRes.ok) {
        const payload = await articlesBySourceStatsRes.json();
        articlesBySource = payload.data;
      }
    } catch (error) {
      console.error("Error checking bookmark status: ", error);
    }
  }

  return (
    <div className="space-y-4">
      <DashboardStats
        {...{ crawledArticlesNumber, newUsersTodayNumber, summarizedArticlesNumber }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-2">
        <div className="bg-primary-foreground p-4 rounded-sm lg:col-span-2 xl:col-span-1 2xl:col-span-2">
          <ChartBarHorizontal data={articlesBySource} />
        </div>
        <div className="bg-primary-foreground p-4 rounded-sm">
          <ChartPieLabel />
        </div>
      </div>
    </div>
  );
}
