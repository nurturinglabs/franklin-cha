import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  iconClassName?: string;
  className?: string;
}

export default function StatCard({
  label,
  value,
  subtitle,
  icon,
  iconClassName = "bg-amber-500/10 text-amber-400",
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`bg-white/[0.03] rounded-xl border border-white/10 p-4 ${className}`}
    >
      {icon && (
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 ${iconClassName}`}
        >
          {icon}
        </div>
      )}
      <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
      <p className="text-[11px] font-medium text-white/50 mt-1 uppercase tracking-wider">
        {label}
      </p>
      {subtitle && (
        <p className="text-[10px] text-white/30 mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}
