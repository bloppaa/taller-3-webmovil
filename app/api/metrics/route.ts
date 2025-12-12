import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const status = searchParams.get("status");
  const type = searchParams.get("type");
  const region = searchParams.get("region");
  const search = searchParams.get("search");

  const where: any = {};

  if (status && status !== "All") {
    where.status = status;
  }

  if (type && type !== "All") {
    where.type = type;
  }

  if (region && region !== "All") {
    where.region = region;
  }

  if (search) {
    where.OR = [
      { serverName: { contains: search, mode: "insensitive" } },
      { region: { contains: search, mode: "insensitive" } },
    ];
  }

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "1000"); // Default high limit for dashboard compatibility if not provided
  const skip = (page - 1) * limit;

  try {
    const [metrics, total] = await prisma.$transaction([
      prisma.metric.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.metric.count({ where }),
    ]);

    return NextResponse.json({
      data: metrics,
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
