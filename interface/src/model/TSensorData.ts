type TSensorData = {
  timestamp: string;
  sensorMean: number;
} & {
  [key in `sensor${number}`]: number;
};

export default TSensorData;
