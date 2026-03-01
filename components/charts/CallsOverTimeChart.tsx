"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CallsOverTimeChartProps {
  data: { date: string; calls: number }[];
  className?: string;
}

const TOOLTIP_STYLE = {
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.1)",
  fontSize: "12px",
  background: "#0f1929",
  color: "#fff",
};

export default function CallsOverTimeChart({
  data,
  className = "",
}: CallsOverTimeChartProps) {
  return (
    <div
      className={`bg-white/[0.03] rounded-xl border border-white/10 p-4 flex flex-col ${className}`}
    >
      <h3 className="text-sm font-semibold text-white/70 mb-3">
        Call Volume
      </h3>
      {data.length === 0 ? (
        <p className="text-sm text-white/30 py-8 text-center">
          No data available yet
        </p>
      ) : (
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="callsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "rgba(255,255,255,0.35)" }}
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
              <Area
                type="monotone"
                dataKey="calls"
                stroke="#d97706"
                strokeWidth={2}
                fill="url(#callsGradient)"
                dot={{ fill: "#d97706", r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
