export interface Metric {
  id: string;
  serverName: string;
  status: "Active" | "Maintenance" | "Down";
  cpuUsage: number;
  ramUsage: number;
  region: string;
  createdAt: string;
  type: "Database" | "Web" | "Worker";
}

const regions = ["US-East", "US-West", "EU-Central", "EU-West", "SA-East"];
const types = ["Database", "Web", "Worker"] as const;
const statuses = ["Active", "Maintenance", "Down"] as const;

export const mockMetrics: Metric[] = Array.from({ length: 60 }).map((_, i) => {
  const type = types[i % 3];
  const region = regions[i % 5];
  // Simple pseudo-random logic
  const statusRandom = (i * 7) % 10;
  const status =
    statusRandom > 8 ? "Down" : statusRandom > 7 ? "Maintenance" : "Active";

  const cpuUsage = 20 + ((i * 13) % 70);
  const ramUsage = 30 + ((i * 17) % 65);

  return {
    id: `srv-${i + 1}`,
    serverName: `${type}-${region.split("-")[1]}-${i + 1}`,
    status,
    cpuUsage,
    ramUsage,
    region,
    createdAt: new Date(Date.now() - i * 86400000).toISOString(), // Spread over days
    type,
  };
});
