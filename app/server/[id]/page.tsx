import { CpuLineChart } from "@/components/charts/CpuLineChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockMetrics } from "@/lib/mock-data";
import { Activity, ArrowLeft, Globe, Server } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return mockMetrics.map((metric) => ({
    id: metric.id,
  }));
}

export default function ServerDetail({ params }: { params: { id: string } }) {
  const metric = mockMetrics.find((m) => m.id === params.id);

  if (!metric) {
    notFound();
  }

  // Generate fake history for the chart based on the current metric
  // to visualize some "detail" data
  const history = Array.from({ length: 20 }).map((_, i) => ({
    ...metric,
    // Fake time history: 1 hour intervals
    createdAt: new Date(Date.now() - (20 - i) * 3600000).toISOString(),
    // Variate CPU slightly around the current value
    cpuUsage: Math.max(
      0,
      Math.min(100, metric.cpuUsage + Math.floor(Math.random() * 40 - 20))
    ),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/grid">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {metric.serverName}
          </h1>
          <p className="text-muted-foreground">Server ID: {metric.id}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Status
            </CardTitle>
            <Activity
              className={`h-4 w-4 ${
                metric.status === "Active" ? "text-green-500" : "text-red-500"
              }`}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.status}</div>
            <p className="text-xs text-muted-foreground">
              Last updated: Just now
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">CPU</span>
              <span className="text-lg font-bold">{metric.cpuUsage}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">RAM</span>
              <span className="text-lg font-bold">{metric.ramUsage}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Location</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.region}</div>
            <p className="text-xs text-muted-foreground">
              {metric.type} Infrastructure
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">24-Hour CPU Performance</h2>
        {/* Reuse the CPU Chart which accepts array of metrics */}
        <div className="h-[400px]">
          <CpuLineChart data={history} />
        </div>
      </div>
    </div>
  );
}
