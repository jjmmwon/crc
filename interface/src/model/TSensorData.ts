import type TSensorKey from "./TSensorKey";

type TSensorData = {
  timestamp: string;
} & {
  [key in TSensorKey]: number;
};

export default TSensorData;
