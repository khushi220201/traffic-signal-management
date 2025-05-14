import { Request, Response } from "express";
import {
  saveTrafficSignalConfig,
  getAllTrafficSignalConfigs,
  getTrafficSignalConfigById,
  getTrafficSignalConfigsByType,
} from "../services/trafficSignalService";
import { IntersectionType } from "@prisma/client";

export const saveConfig = async (req: Request, res: Response) => {
  try {
    const config = await saveTrafficSignalConfig(req.body);
    res.status(201).json({
      success: true,
      message: "Traffic signal config created successfully",
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

export const getAllConfigs = async (req: Request, res: Response) => {
  try {
    const configs = await getAllTrafficSignalConfigs();
    res.status(200).json({
      success: true,
      message: "Fetched all traffic signal configs successfully",
      data: configs || [],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch configs",
      error: error.message,
    });
  }
};

export const getConfigById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("ID is required");
    }

    const config = await getTrafficSignalConfigById(id);

    if (!config) {
      throw new Error("Config not found");
    }

    res.status(200).json({
      success: true,
      message: "Fetched traffic signal config by ID successfully",
      data: config,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch config",
      error: error.message,
    });
  }
};

export const getConfigsByType = async (req: Request, res: Response) => {
  try {
    const { intersectionType } = req.params;
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
