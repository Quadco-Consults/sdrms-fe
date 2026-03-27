"use client";

interface DiversityStatsCardProps {
  title: string;
  count: number;
  percentage: number;
  comparison: number;
  icon: React.ReactNode;
  color: string;
}

export default function DiversityStatsCard({
  title,
  count,
  percentage,
  comparison,
  icon,
  color,
}: DiversityStatsCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm text-gray-600">{title}</span>
        </div>
        <div className="relative w-16 h-16">
          <svg className="transform -rotate-90 w-16 h-16">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke={color}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(percentage / 100) * 175.93} 175.93`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold">{percentage}%</span>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-gray-900">{count.toLocaleString()}</p>
        <p className="text-xs text-gray-500 mt-1">
          Compared to 1 year +{comparison}%
        </p>
      </div>
    </div>
  );
}
