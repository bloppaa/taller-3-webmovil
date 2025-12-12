"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metric } from "@/lib/mock-data";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export function TypeRadarChart({ data }: { data: Metric[] }) {
  const typeStats = data.reduce((acc, curr) => {
    if (!acc[curr.type]) acc[curr.type] = { cpuSum: 0, ramSum: 0, count: 0 };
    acc[curr.type].cpuSum += curr.cpuUsage;
    acc[curr.type].ramSum += curr.ramUsage;
    acc[curr.type].count += 1;
    return acc;
  }, {} as Record<string, { cpuSum: number; ramSum: number; count: number }>);

  const chartData = Object.entries(typeStats).map(([type, stats]) => ({
    subject: type,
    cpu: Math.round(stats.cpuSum / stats.count),
    ram: Math.round(stats.ramSum / stats.count),
    fullMark: 100,
  }));

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Avg Performance by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Avg CPU"
              dataKey="cpu"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.5}
            />
            <Radar
              name="Avg RAM"
              dataKey="ram"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.5}
            />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "none" }} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
