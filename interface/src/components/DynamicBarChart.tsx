import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TSensorData } from "@model";
import { Box, VStack, Text } from "@chakra-ui/react";

interface DynamicBarChartProps {
  width: string | number;
  height: string | number;
  chartHeight: string | number;
  data: TSensorData[];
  windowSize: number;
}

const DynamicBarChart: React.FC<DynamicBarChartProps> = ({
  width,
  chartHeight,
  data,
}) => {
  // 가장 최근의 데이터를 사용하여 막대 차트에 필요한 데이터 구조를 만듦
  const latestData = data.slice(-1)[0]; // 가장 최근 데이터 하나만 사용
  const sensorList = Object.keys(latestData)
    .filter((key) => key.startsWith("sensor"))
    .map((key) => key.slice(6))
    .sort((a, b) => parseInt(a) - parseInt(b));

  // X축에 센서 이름, Y축에 센서의 값을 표시하는 데이터 생성
  const chartData = [
    ...sensorList.map((sensorKey) => ({
      name: sensorKey,
      value: latestData[`sensor${sensorKey}` as keyof TSensorData],
    })),
  ];

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
      <BarChart data={chartData} margin={{ right: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill={colormap[0]} animationDuration={50} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const DynamicBarChartView: React.FC<DynamicBarChartProps> = (
  props: DynamicBarChartProps
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
        <Text fontSize="2xl" fontWeight="bold" alignSelf="flex-start">
          Radiation Overview
        </Text>

        <DynamicBarChart {...props} />
      </VStack>
    </Box>
  );
};

export default DynamicBarChartView;
