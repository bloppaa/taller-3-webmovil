-- CreateTable
CREATE TABLE "Metric" (
    "id" TEXT NOT NULL,
    "serverName" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "cpuUsage" INTEGER NOT NULL,
    "ramUsage" INTEGER NOT NULL,
    "region" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id")
);
