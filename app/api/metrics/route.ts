import { mockMetrics } from "@/lib/mock-data";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const status = searchParams.get("status");
  const type = searchParams.get("type");
  const region = searchParams.get("region");
  const search = searchParams.get("search");

  let filtered = [...mockMetrics];

  if (status && status !== "All") {
    filtered = filtered.filter((m) => m.status === status);
  }

  if (type && type !== "All") {
    filtered = filtered.filter((m) => m.type === type);
  }

  if (region && region !== "All") {
    filtered = filtered.filter((m) => m.region === region);
  }

  if (search) {
    filtered = filtered.filter(
      (m) =>
        m.serverName.toLowerCase().includes(search.toLowerCase()) ||
        m.region.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Simulate network delay for realism
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json(filtered);
}
