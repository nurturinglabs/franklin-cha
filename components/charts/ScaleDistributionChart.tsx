"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";

interface ScaleDistributionChartProps {
  title: string;
  data: { rating: number; count: number }[];
  average: number;
  minLabel?: string;
  maxLabel?: string;
  className?: string;
}

const COLORS = ["#fef3c7", "#fde68a", "#fcd34d", "#f59e0b", "#d97706"];

const TOOLTIP_STYLE = {
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.1)",
  fontSize: "12px",
  background: "#0f1929",
  color: "#fff",
};

export default function ScaleDistributionChart({
  title,
  data,
  average,
  minLabel,
  maxLabel,
  className = "",
}: ScaleDistributionChartProps) {
  return (
    <div
      className={`bg-white/[0.03] rounded-xl border border-white/10 p-4 flex flex-col ${className}`}
    >
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-sm font-semibold text-white/70">{title}</h3>
        <span className="text-[10px] text-white/30">
          {minLabel && maxLabel && `${minLabel} → ${maxLabel}`}
        </span>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.06)"
              vertical={false}
            />
            <XAxis
              dataKey="rating"
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <ReferenceLine
              y={average}
              stroke="rgba(255,255,255,0.3)"
              strokeDasharray="4 4"
              label={{
                value: `Avg ${average.toFixed(1)}`,
                fill: "rgba(255,255,255,0.5)",
                fontSize: 10,
                position: "right",
              }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} animationDuration={800}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
