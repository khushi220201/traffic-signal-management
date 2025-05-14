import { Router } from "express";
import {
  saveConfig,
  getAllConfigs,
  getConfigById,
  getConfigsByType,
} from "../controllers/trafficSignalController";
import { saveTrafficSignalConfigRules } from "../helpers/validators";
import { validateRequest } from "../helpers/validationHelper";

const router = Router();

router.post("/", saveTrafficSignalConfigRules, validateRequest, saveConfig);
router.get("/", getAllConfigs);
router.get("/:id", getConfigById);
router.get("/type/:intersectionType", getConfigsByType);

export default router;
