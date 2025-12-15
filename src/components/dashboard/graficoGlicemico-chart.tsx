"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { useEffect, useState } from "react";

interface Props {
  chartData: any;
}

export function GraficoGlicemicoChart({ chartData }: Props) {
  // useEffect({
  //   setRefreshKey(oldKey => oldKey + 1);
  // }, [chartData]);

  const ChartConfig = {
    desktop: {
      label: "Glicemia",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const dotColors = () => {
    if (chartData.Valor > 250) {
      return { fill: "var(--chart-1)" };
    } else {
      return { fill: "var(--char-2)" };
    }
  };

  return (
    <ChartContainer config={ChartConfig} className="h-auto w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={8}
          tickFormatter={(tick) => tick.slice(0, 2)}
          // padding={{ left: 0, right: 0 }}
          interval="preserveStartEnd"
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="Valor"
          type="natural"
          stroke="var(--chart-2)"
          strokeWidth={2}
          dot={{
            fill: "var(--chart-2)",
          }}
          activeDot={{
            r: 5,
          }}
        >
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Line>
      </LineChart>
    </ChartContainer>
  );
}
