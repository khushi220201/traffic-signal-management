import { IntersectionType } from "@prisma/client";
import { ITrafficSignalConfig } from "../interfaces/trafficSignalInterface";
import {
  getConfigsByType,
  saveConfig,
} from "../repositories/trafficSignalRepository";

export const saveTrafficSignalConfig = async (data: ITrafficSignalConfig) => {
  return await saveConfig(data);
};

export const getTrafficSignalConfigsByType = async (
  intersectionType: IntersectionType
) => {
  return await getConfigsByType(intersectionType);
};
