interface DashboardStatsProps {
  crawledArticlesNumber: number;
  newUsersTodayNumber: number;
  summarizedArticlesNumber: number;
}

export default async function DashboardStats({
  crawledArticlesNumber,
  newUsersTodayNumber,
  summarizedArticlesNumber,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <div className="rounded-sm border bg-card text-card-foreground p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">Bài báo mới hôm nay</p>
          <span className="text-green-500 text-xs font-bold">+12%</span>
        </div>
        <div className="text-2xl font-bold">+{crawledArticlesNumber}</div>
        <p className="text-xs text-muted-foreground mt-1">So với hôm qua</p>
      </div>

      <div className="rounded-sm border bg-card text-card-foreground p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">Người dùng mới</p>
        </div>
        <div className="text-2xl font-bold">+{newUsersTodayNumber}</div>
        <p className="text-xs text-muted-foreground mt-1">Hoạt động tích cực</p>
      </div>

      <div className="rounded-sm border bg-card text-card-foreground p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">
            Bài báo đã tóm tắt hôm nay
          </p>
        </div>
        <div className="text-2xl font-bold">+{summarizedArticlesNumber}</div>
        <p className="text-xs text-muted-foreground mt-1">Xử lý bởi AI</p>
      </div>
    </div>
  );
}
