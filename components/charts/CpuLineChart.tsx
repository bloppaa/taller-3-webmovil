"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metric } from "@/lib/mock-data";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function CpuLineChart({ data }: { data: Metric[] }) {
  // Sort by date for line chart
  const sortedData = [...data].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // Only take last 20 points for readability if too many
  const chartData = sortedData.map((d) => ({
    name: d.serverName,
    cpu: d.cpuUsage,
    date: new Date(d.createdAt).toLocaleDateString(),
  }));

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>CPU Usage Trend</CardTitle>
      </CardHeader>
      <CardContent className="pl-0">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} minTickGap={30} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey="cpu"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
