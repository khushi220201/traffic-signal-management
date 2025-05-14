-- CreateEnum
CREATE TYPE "IntersectionType" AS ENUM ('THREE_WAY', 'FOUR_WAY_TYPE1', 'FOUR_WAY_TYPE2', 'FIVE_WAY');

-- CreateTable
CREATE TABLE "TrafficSignalConfig" (
    "id" TEXT NOT NULL,
    "intersectionType" "IntersectionType" NOT NULL,
    "signal1Time" INTEGER NOT NULL,
    "signal2Time" INTEGER NOT NULL,
    "signal3Time" INTEGER NOT NULL,
    "signal4Time" INTEGER,
    "signal5Time" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrafficSignalConfig_pkey" PRIMARY KEY ("id")
);
