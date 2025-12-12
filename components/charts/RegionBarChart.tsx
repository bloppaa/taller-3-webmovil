"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metric } from "@/lib/mock-data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function RegionBarChart({ data }: { data: Metric[] }) {
  const regionCounts = data.reduce((acc, curr) => {
    acc[curr.region] = (acc[curr.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(regionCounts).map(([region, count]) => ({
    region,
    count,
  }));

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Servers by Region</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              className="opacity-50"
            />
            <XAxis dataKey="region" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
              contentStyle={{ borderRadius: "8px", border: "none" }}
            />
            <Bar
              dataKey="count"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
