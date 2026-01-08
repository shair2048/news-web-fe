"use client";

import { Label, Pie, PieChart, Sector } from "recharts";

import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

interface SourceStat {
  categoryName: string;
  value: number;
  percentage: number;
}

interface ChartPieLabelProps {
  data: SourceStat[];
}

export function ChartPieInteractive({ data }: ChartPieLabelProps) {
  const id = "pie-interactive";

  const { chartData, chartConfig } = useMemo(() => {
    if (!data || data.length === 0) return { chartData: [], chartConfig: {} };

    const config: ChartConfig = {};
    const processedData = data.map((item, index) => {
      const colorVar = `var(--chart-${(index % 5) + 1})`;

      config[item.categoryName] = {
        label: item.categoryName,
        color: colorVar,
      };

      return {
        ...item,
        fill: colorVar,
      };
    });

    return { chartData: processedData, chartConfig: config };
  }, [data]);

  const [activeCategory, setActiveCategory] = useState<string>(
    data?.[0]?.categoryName || ""
  );

  const activeIndex = useMemo(
    () => chartData.findIndex((item) => item.categoryName === activeCategory),
    [activeCategory, chartData]
  );

  const categories = useMemo(
    () => chartData.map((item) => item.categoryName),
    [chartData]
  );

  if (!data || data.length === 0) {
    return <div className="p-4 text-center text-muted-foreground">Chưa có dữ liệu</div>;
  }

  return (
    <div data-chart={id} className="flex flex-col gap-4">
      <ChartStyle id={id} config={chartConfig} />

      <div className="flex flex-wrap items-center gap-2 space-y-0 pb-0">
        <h1 className="text-md font-medium text-muted-foreground flex-1">
          Số lượng các bài báo theo thể loại
        </h1>

        <Select value={activeCategory} onValueChange={setActiveCategory}>
          <SelectTrigger
            className="h-7 w-[140px] rounded-lg pl-2.5"
            aria-label="Chọn danh mục"
          >
            <SelectValue placeholder="Chọn danh mục" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {categories.map((key) => {
              const config = chartConfig[key];
              if (!config) return null;

              return (
                <SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: config.color,
                      }}
                    />
                    {config.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <ChartContainer
        id={id}
        config={chartConfig}
        className="mx-auto aspect-square w-full max-w-[300px]"
      >
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="categoryName"
            innerRadius={60}
            strokeWidth={5}
            activeIndex={activeIndex}
            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
              <g>
                <Sector {...props} outerRadius={outerRadius + 10} />
                <Sector
                  {...props}
                  outerRadius={outerRadius + 25}
                  innerRadius={outerRadius + 12}
                />
              </g>
            )}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {chartData[activeIndex]?.value.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24}>
                        Bài viết
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
