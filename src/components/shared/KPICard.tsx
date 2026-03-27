"use client";

import { cn } from "@/lib/utils";

interface KPICardProps {
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
  pct?: number; // Progress percentage (0-100)
  trend?: string; // e.g., "+12%", "-5%"
  className?: string;
}

export default function KPICard({
  label,
  value,
  unit = "",
  color = "#1B5E20", // Default NNPC green
  pct,
  trend,
  className,
}: KPICardProps) {
  // Determine if trend is positive or negative
  const isNegativeTrend = trend?.startsWith("-") || trend?.startsWith("+");
  const isPositive = trend?.startsWith("-"); // For emissions/waste, reduction is positive
  const isNeutral = trend && !trend.match(/[+-]/);

  return (
    <div
      className={cn(
        "bg-white rounded-lg p-4 shadow-sm border-t-2 transition-all duration-200 hover:bg-gray-50",
        className
      )}
      style={{ borderTopColor: color }}
    >
      {/* Label */}
      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-2">
        {label}
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1.5">
        <div className="text-2xl font-extrabold text-gray-900 tabular-nums leading-none">
          {value}
        </div>
        {unit && (
          <div className="text-xs text-gray-500 font-medium">{unit}</div>
        )}
      </div>

      {/* Progress Bar */}
      {pct !== undefined && (
        <div className="mt-3">
          <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(pct, 100)}%`,
                backgroundColor: color,
              }}
            />
          </div>
        </div>
      )}

      {/* Trend Indicator */}
      {trend && (
        <div className="mt-2 text-[10px] flex items-center gap-1.5">
          <span
            className={cn(
              "font-bold px-1.5 py-0.5 rounded-full",
              isNeutral
                ? "bg-gray-100 text-gray-700"
                : isPositive
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            )}
          >
            {trend}
          </span>
          <span className="text-gray-500">vs last period</span>
        </div>
      )}
    </div>
  );
}
