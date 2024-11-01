import type TSensorKey from "./TSensorKey";

type TSensorData = {
  timestamp: string;
  source: number;
} & {
  [key in TSensorKey]: number;
};

export default TSensorData;
