"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface SourceStat {
  sourceName: string;
  count: number;
}

interface ChartBarHorizontalProps {
  data: SourceStat[];
}

const chartConfig = {
  count: {
    label: "Số bài báo",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function ChartBarHorizontal({ data }: ChartBarHorizontalProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-md font-medium text-muted-foreground">
        Thống kê các bài báo theo nguồn
      </h1>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={data}
          layout="vertical"
          margin={{
            left: 0,
          }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis type="number" dataKey="count" hide />
          <YAxis
            dataKey="sourceName"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            width={80}
            tickFormatter={(value) => value}
            className="text-sm font-regular"
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="count" fill="var(--color-count)" radius={4} barSize={50} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
