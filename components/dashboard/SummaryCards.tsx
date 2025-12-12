import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metric } from "@/lib/mock-data";
import { Activity, AlertTriangle, Cpu, Server } from "lucide-react";

export function SummaryCards({ data }: { data: Metric[] }) {
  const totalServers = data.length;
  const activeServers = data.filter((d) => d.status === "Active").length;
  const avgCpu = Math.round(
    data.reduce((acc, curr) => acc + curr.cpuUsage, 0) / (totalServers || 1)
  );
  const alerts = data.filter((d) => d.status === "Down").length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Servers</CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalServers}</div>
          <p className="text-xs text-muted-foreground">
            {activeServers} Active
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg CPU Usage</CardTitle>
          <Cpu className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgCpu}%</div>
          <p className="text-xs text-muted-foreground">Across all servers</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">System Health</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.round((activeServers / (totalServers || 1)) * 100)}%
          </div>
          <p className="text-xs text-muted-foreground">Operational</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{alerts}</div>
          <p className="text-xs text-muted-foreground">Servers Down</p>
        </CardContent>
      </Card>
    </div>
  );
}
