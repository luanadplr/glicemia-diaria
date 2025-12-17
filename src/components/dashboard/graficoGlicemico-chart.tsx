"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

interface Props {
  chartData: any;
  nivelGlicemia: number;
}

export function GraficoGlicemicoChart({ chartData, nivelGlicemia }: Props) {
  const ChartConfig = {
    glicemia: {
      label: "Glicemia",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={ChartConfig} className="w-full h-[300px] p-2">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid />
        <XAxis
          dataKey="date"
          tickMargin={8}
          tickFormatter={(tick) => tick.slice(0, 5)}
          interval="preserveStartEnd"
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideIndicator />}
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
          name="Glicemia"
        />
        <ReferenceLine
          y={nivelGlicemia}
          stroke="orange"
          strokeDasharray="5 5"
          label="Nível Ideal de Glicemia"
        />
        <YAxis />
        <Legend />
      </LineChart>
    </ChartContainer>
  );
}
