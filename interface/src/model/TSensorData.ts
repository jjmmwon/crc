import type SensorKey from "./TSensorKey";

type TSensorData = {
  timestamp: string;
  sensorMean: number;
} & {
  [key in SensorKey]: number;
};

export default TSensorData;
