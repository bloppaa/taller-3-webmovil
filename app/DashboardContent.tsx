"use client";
import { CpuLineChart } from "@/components/charts/CpuLineChart";
import { RamAreaChart } from "@/components/charts/RamAreaChart";
import { RegionBarChart } from "@/components/charts/RegionBarChart";
import { StatusPieChart } from "@/components/charts/StatusPieChart";
import { TypeRadarChart } from "@/components/charts/TypeRadarChart";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { Metric } from "@/lib/mock-data";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function DashboardContent() {
  const filters = useSelector((state: RootState) => state.filters);
  const [data, setData] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.status !== "All") params.append("status", filters.status);
      if (filters.type !== "All") params.append("type", filters.type);
      if (filters.region !== "All") params.append("region", filters.region);
      if (filters.search) params.append("search", filters.search);

      try {
        const res = await fetch(`/api/metrics?${params.toString()}`);
        const json = await res.json();
        // Handle paginated response structure for dashboard (expects all data or large limit)
        setData(json.data || json); // Fallback if API changes back or for safety
      } catch (error) {
        console.error("Failed to fetch metrics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Monitor server performance and health metrics in real-time.
        </p>
      </div>

      <FilterBar />

      {loading ? (
        <div className="flex h-64 items-center justify-center text-muted-foreground animate-pulse">
          Loading metrics...
        </div>
      ) : (
        <>
          <SummaryCards data={data} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <CpuLineChart data={data} />
            </div>
            <div className="col-span-1 md:col-span-1">
              <StatusPieChart data={data} />
            </div>
            <div className="col-span-1 md:col-span-1">
              <RegionBarChart data={data} />
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <RamAreaChart data={data} />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <TypeRadarChart data={data} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
