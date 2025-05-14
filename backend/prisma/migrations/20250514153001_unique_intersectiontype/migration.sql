/*
  Warnings:

  - A unique constraint covering the columns `[intersectionType]` on the table `TrafficSignalConfig` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TrafficSignalConfig_intersectionType_key" ON "TrafficSignalConfig"("intersectionType");
