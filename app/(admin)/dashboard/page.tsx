import { ChartBarHorizontal } from "@/components/ChartBarHorizontal";
import { ChartPieLabel } from "@/components/ChartPieLabel";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="bg-primary-foreground p-4 rounded-lg">
          {/* <AppBarChart /> */}
          Text
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          {/* <CardList title="Latest Transactions" /> */}
          Text
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          {/* <AppPieChart /> */}
          Text
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-2">
        <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
          <ChartBarHorizontal />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <ChartPieLabel />
        </div>
      </div>
    </div>
  );
}
