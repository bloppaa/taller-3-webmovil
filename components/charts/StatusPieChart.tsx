"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metric } from "@/lib/mock-data";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export function StatusPieChart({ data }: { data: Metric[] }) {
  const statusCounts = data.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = [
    { name: "Active", value: statusCounts["Active"] || 0 },
    { name: "Maintenance", value: statusCounts["Maintenance"] || 0 },
    { name: "Down", value: statusCounts["Down"] || 0 },
  ].filter((d) => d.value > 0);

  const getColor = (status: string) => {
    switch (status) {
      case "Active":
        return "#22c55e"; // green-500
      case "Maintenance":
        return "#f59e0b"; // amber-500
      case "Down":
        return "#ef4444"; // red-500
      default:
        return "#8884d8";
    }
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Server Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: "8px", border: "none" }} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
