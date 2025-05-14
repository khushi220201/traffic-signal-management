export enum IntersectionTypes {
  THREE_WAY = "THREE_WAY",
  FOUR_WAY_TYPE1 = "FOUR_WAY_TYPE1",
  FOUR_WAY_TYPE2 = "FOUR_WAY_TYPE2",
  FIVE_WAY = "FIVE_WAY",
}

export interface ISignalFormValues {
  signal1: string;
  signal2: string;
  signal3: string;
  signal4?: string;
  signal5?: string;
  intersectionType: IntersectionTypes;
}
