"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metric } from "@/lib/mock-data";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function RamAreaChart({ data }: { data: Metric[] }) {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const chartData = sortedData.map((d) => ({
    name: d.serverName,
    ram: d.ramUsage,
    date: new Date(d.createdAt).toLocaleDateString(),
  }));

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>RAM Usage Trends</CardTitle>
      </CardHeader>
      <CardContent className="pl-0">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} hide />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "none" }} />
            <Area
              type="monotone"
              dataKey="ram"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorRam)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
