"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TopHealthConcernsChartProps {
  title: string;
  data: { topic: string; count: number }[];
  className?: string;
}

const TOOLTIP_STYLE = {
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.1)",
  fontSize: "12px",
  background: "#0f1929",
  color: "#fff",
};

export default function TopHealthConcernsChart({
  title,
  data,
  className = "",
}: TopHealthConcernsChartProps) {
  return (
    <div
      className={`bg-white/[0.03] rounded-xl border border-white/10 p-4 flex flex-col ${className}`}
    >
      <h3 className="text-sm font-semibold text-white/70 mb-3">{title}</h3>
      {data.length === 0 ? (
        <p className="text-sm text-white/30 py-8 text-center">
          No data available yet
        </p>
      ) : (
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <defs>
                <linearGradient id="healthGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fde68a" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />
              <XAxis
                type="number"
                allowDecimals={false}
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="topic"
                width={90}
                tick={{ fontSize: 10, fill: "rgba(255,255,255,0.5)" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar
                dataKey="count"
                fill="url(#healthGradient)"
                radius={[0, 4, 4, 0]}
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
