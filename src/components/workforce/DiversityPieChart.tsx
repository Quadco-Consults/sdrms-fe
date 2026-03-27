"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { PieChartData } from "@/types/workforce";

interface DiversityPieChartProps {
  data: PieChartData[];
}

export default function DiversityPieChart({ data }: DiversityPieChartProps) {
  const renderLegend = () => {
    return (
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600">{entry.name}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderLabel = ({ name, value }: any) => {
    return `${value}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Workforce Diversity
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {renderLegend()}
    </div>
  );
}
