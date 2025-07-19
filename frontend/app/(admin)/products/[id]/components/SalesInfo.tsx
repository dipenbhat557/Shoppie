// frontend/app/(admin)/products/[id]/components/SalesInfo.tsx
"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, TrendingUp, DollarSign, ShoppingBag } from "lucide-react";

interface SalesMetric {
  title: string;
  value: string;
  change: number;
  icon: any;
}

// Mock data for the chart
const salesData = [
  { date: "Jan", sales: 4000, revenue: 2400 },
  { date: "Feb", sales: 3000, revenue: 1398 },
  { date: "Mar", sales: 2000, revenue: 9800 },
  { date: "Apr", sales: 2780, revenue: 3908 },
  { date: "May", sales: 1890, revenue: 4800 },
  { date: "Jun", sales: 2390, revenue: 3800 },
];

const metrics: SalesMetric[] = [
  {
    title: "Total Sales",
    value: "$12,345",
    change: 12.5,
    icon: DollarSign,
  },
  {
    title: "Units Sold",
    value: "234",
    change: -5.2,
    icon: ShoppingBag,
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: 2.1,
    icon: TrendingUp,
  },
  {
    title: "Avg. Order Value",
    value: "$52.45",
    change: 8.4,
    icon: Calendar,
  },
];

export function SalesInfo() {
  const [timeRange, setTimeRange] = useState("6M");

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{metric.title}</p>
                <h3 className="text-2xl font-semibold mt-1">{metric.value}</h3>
              </div>
              <div className={`p-3 rounded-full ${metric.change >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <metric.icon className={`w-5 h-5 ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className={`text-sm ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change >= 0 ? '+' : ''}{metric.change}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
          >
            <option value="1M">Last Month</option>
            <option value="3M">Last 3 Months</option>
            <option value="6M">Last 6 Months</option>
            <option value="1Y">Last Year</option>
          </select>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#FFC633"
                strokeWidth={2}
                dot={{ fill: "#FFC633" }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#94A3B8"
                strokeWidth={2}
                dot={{ fill: "#94A3B8" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 