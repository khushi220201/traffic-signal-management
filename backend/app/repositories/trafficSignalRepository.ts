import { prisma } from "../client/prisma";
import { ITrafficSignalConfig } from "../interfaces/trafficSignalInterface";
import { IntersectionType } from "@prisma/client";

export const saveConfig = async (data: ITrafficSignalConfig) => {
  return await prisma.trafficSignalConfig.upsert({
    where: {
      intersectionType: data.intersectionType,
    },
    update: {
      signal1Time: data.signal1Time,
      signal2Time: data.signal2Time,
      signal3Time: data.signal3Time,
      signal4Time: data.signal4Time,
      signal5Time: data.signal5Time,
    },
    create: {
      intersectionType: data.intersectionType,
      signal1Time: data.signal1Time,
      signal2Time: data.signal2Time,
      signal3Time: data.signal3Time,
      signal4Time: data.signal4Time,
      signal5Time: data.signal5Time,
    },
  });
};

export const getConfigsByType = async (intersectionType: IntersectionType) => {
  return await prisma.trafficSignalConfig.findUnique({
    where: { intersectionType },
  });
};
