import express from "express";
import trafficSignalRoutes from "./trafficSignalRoutes";
import { errorHandler, notFound } from "../middleware/errorHanlder";
const routes = express.Router();

routes.use("/traffic-signal-configs", trafficSignalRoutes);

routes.use(errorHandler);
routes.use(notFound);

export default routes;
