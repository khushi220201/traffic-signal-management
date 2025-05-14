import {
  saveConfig,
  getAllConfigs,
  getConfigById,
  getConfigsByType,
} from "../repositories/trafficSignalRepository";
import { ITrafficSignalConfig } from "../interfaces/trafficSignalInterface";
import { IntersectionType } from "@prisma/client";

export const saveTrafficSignalConfig = async (data: ITrafficSignalConfig) => {
  return await saveConfig(data);
};

export const getAllTrafficSignalConfigs = async () => {
  return await getAllConfigs();
};

export const getTrafficSignalConfigById = async (id: string) => {
  return await getConfigById(id);
};

export const getTrafficSignalConfigsByType = async (
  intersectionType: IntersectionType
) => {
  return await getConfigsByType(intersectionType);
};
