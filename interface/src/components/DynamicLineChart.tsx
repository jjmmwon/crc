import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TSensorData } from "@model";
import { Box, VStack, Text, HStack } from "@chakra-ui/react";
import { useSensorListStore } from "@stores";

interface DynamicLineChartProps {
  width: string | number;
  height: string | number;
  chartHeight: string | number;
  data: TSensorData[];
  windowSize: number;
  sensorList: `sensor${number}`[];
}

const DynamicLineChart: React.FC<DynamicLineChartProps> = ({
  width,
  chartHeight,
  data,
  windowSize,
}) => {
  const sensorList = useSensorListStore((state) => state.sensorList);

  const showingData = data.slice(-windowSize);
  console.log(showingData);

  const sensorMean = showingData.map((d) => d.sensorMean);
  const time = showingData.map((d) =>
    new Date(d.timestamp).toLocaleTimeString("en-GB", { hour12: false })
  );

  const chartData = time.map((t, i) => {
    // 기본적으로 시간과 Sensor Mean을 포함한 객체 생성
    const chartDataItem: { [key: string]: number | string } = {
      name: t,
      "Sensor Mean": sensorMean[i],
    };

    // sensorList에 있는 각 key에 대해 해당 값을 추가
    sensorList.forEach((sensorKey) => {
      chartDataItem[sensorKey] = showingData[i][sensorKey]; // 예를 들어, data[i]['temperature']
    });

    return chartDataItem;
  });

  const colormap = [
    "#4e79a7",
    "#f28e2c",
    "#e15759",
    "#76b7b2",
    "#59a14f",
    "#edc949",
    "#af7aa1",
    "#ff9da7",
    "#9c755f",
    "#bab0ab",
  ];

  return (
    <ResponsiveContainer width={width} height={chartHeight}>
      <LineChart data={chartData} margin={{ right: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="linear"
          dataKey="Sensor Mean"
          stroke={colormap[0]}
          animationDuration={50}
        />
        {sensorList.map((sensorKey, i) => (
          <Line
            key={sensorKey}
            type="linear"
            dataKey={sensorKey}
            stroke={`${colormap[(i + 1) % colormap.length]}`}
            animationDuration={50}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

const DynamicLineChartView: React.FC<DynamicLineChartProps> = (
  props: DynamicLineChartProps
) => {
  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
      width={props.width}
      height={props.height}
    >
      <VStack spacing={6}>
        <HStack justifyContent="space-between" width="100%">
          <Text fontSize="2xl" fontWeight="bold" alignSelf="flex-start">
            Radiation Trend View{" "}
            {`(Current Avg: ${props.data.slice(-1)[0].sensorMean.toFixed(2)})`}
          </Text>
        </HStack>

        <DynamicLineChart {...props} />
      </VStack>
    </Box>
  );
};
export default DynamicLineChartView;
