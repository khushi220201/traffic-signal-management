import { IntersectionType } from "@prisma/client";

export interface ITrafficSignalConfig {
  intersectionType: IntersectionType;
  signal1Time: number;
  signal2Time: number;
  signal3Time: number;
  signal4Time?: number;
  signal5Time?: number;
}
