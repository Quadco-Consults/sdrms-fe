"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CSRChartData } from "@/types/csr";

interface CSRTrackingChartProps {
  data: CSRChartData[];
}

export default function CSRTrackingChart({ data }: CSRTrackingChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">CSR Tracking</h3>
        <button className="text-sm text-gray-600 hover:text-gray-900">
          MORE
        </button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} barGap={2} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis
            dataKey="category"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{ paddingTop: "20px" }}
          />
          <Bar
            dataKey="year2021"
            fill="#6366f1"
            name="2021"
            radius={[4, 4, 0, 0]}
            label={{ position: "top", fill: "#374151", fontSize: 11 }}
          />
          <Bar
            dataKey="year2022"
            fill="#22c55e"
            name="2022"
            radius={[4, 4, 0, 0]}
            label={{ position: "top", fill: "#374151", fontSize: 11 }}
          />
          <Bar
            dataKey="year2023"
            fill="#f59e0b"
            name="2023"
            radius={[4, 4, 0, 0]}
            label={{ position: "top", fill: "#374151", fontSize: 11 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
