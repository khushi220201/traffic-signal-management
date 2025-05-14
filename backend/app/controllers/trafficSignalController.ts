import { IntersectionType } from "@prisma/client";
import { Request, Response } from "express";
import {
  getTrafficSignalConfigsByType,
  saveTrafficSignalConfig
} from "../services/trafficSignalService";

export const saveConfig = async (req: Request, res: Response) => {
  try {
    const config = await saveTrafficSignalConfig(req.body);
    res.status(201).json({
      success: true,
      message: "Traffic signal configuration has been successfully applied.",
      data: config,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to create traffic signal config",
      error: error.message,
    });
  }
};

export const getConfigsByType = async (req: Request, res: Response) => {
  try {
    const { intersectionType } = req.params;

    const VALID_INTERSECTION_TYPES: string[] = [
      "THREE_WAY",
      "FOUR_WAY_TYPE1",
      "FOUR_WAY_TYPE2",
      "FIVE_WAY",
    ];

    if (!VALID_INTERSECTION_TYPES.includes(intersectionType)) {
      throw new Error(
        `Invalid intersectionType. Must be one of: ${VALID_INTERSECTION_TYPES.join(
          ", "
        )}`
      );
    }

    const configs = await getTrafficSignalConfigsByType(
      intersectionType as IntersectionType
    );
    res.status(200).json({
      success: true,
      message: "Fetched traffic signal configs by type successfully",
      data: configs || [],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch configs by type",
      error: error.message,
    });
  }
};
