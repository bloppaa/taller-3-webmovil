import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const regions = ["US-East", "US-West", "EU-Central", "EU-West", "SA-East"];
const types = ["Database", "Web", "Worker"];
const length = 100;

export async function GET() {
  try {
    const data = Array.from({ length: length }).map((_, i) => {
      const typeRandom = Math.floor(Math.random() * types.length);
      const regionRandom = Math.floor(Math.random() * regions.length);
      const statusRandom = Math.floor(Math.random() * 10);

      let status = "Active";
      if (statusRandom > 8) status = "Down";
      else if (statusRandom > 7) status = "Maintenance";

      const type = types[typeRandom];
      const region = regions[regionRandom];

      return {
        serverName: `${
          type === "Database" ? "DB" : type === "Worker" ? "Worker" : "Web"
        }-${region}-${i + 1000}`,
        status,
        cpuUsage: 10 + Math.floor(Math.random() * 85),
        ramUsage: 20 + Math.floor(Math.random() * 75),
        region: region,
        type: type,
        createdAt: new Date(
          Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
        ),
      };
    });

    await prisma.metric.deleteMany({});

    await prisma.metric.createMany({
      data,
    });

    return NextResponse.json(
      { message: `Seeded ${length} records successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: String(error) },
      { status: 500 }
    );
  }
}
