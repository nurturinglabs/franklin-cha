"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface YesNoChartProps {
  title: string;
  yesCount: number;
  noCount: number;
  className?: string;
}

const COLORS = ["#f59e0b", "rgba(255,255,255,0.12)"];

const TOOLTIP_STYLE = {
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.1)",
  fontSize: "12px",
  background: "#0f1929",
  color: "#fff",
};

export default function YesNoChart({
  title,
  yesCount,
  noCount,
  className = "",
}: YesNoChartProps) {
  const total = yesCount + noCount;
  const yesPercent = total > 0 ? Math.round((yesCount / total) * 100) : 0;
  const noPercent = total > 0 ? 100 - yesPercent : 0;

  const data = [
    { name: "Yes", value: yesCount, percent: yesPercent },
    { name: "No", value: noCount, percent: noPercent },
  ];

  return (
    <div
      className={`bg-white/[0.03] rounded-xl border border-white/10 p-4 flex flex-col ${className}`}
    >
      <h3 className="text-sm font-semibold text-white/70 mb-3">{title}</h3>
      <div className="flex-1 min-h-0 flex items-center gap-6">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={55}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip contentStyle={TOOLTIP_STYLE} />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div>
              <span className="text-sm font-semibold text-white">
                {yesPercent}%
              </span>
              <span className="text-sm text-white/40 ml-1">
                Yes ({yesCount})
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-white/20" />
            <div>
              <span className="text-sm font-semibold text-white">
                {noPercent}%
              </span>
              <span className="text-sm text-white/40 ml-1">
                No ({noCount})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
