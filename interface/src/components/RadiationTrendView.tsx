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
import { TSensorData, TSensorKey } from "@model";
import { Box, VStack, Text, HStack, IconButton } from "@chakra-ui/react";
import { useSensorListStore } from "@stores";
import { BsPause, BsPlay } from "react-icons/bs";

interface RadiationTrendViewProps {
  width: string | number;
  height: string | number;
  chartHeight: string | number;
  data: TSensorData[];
  windowSize: number;
  sensorList: `sensor${number}`[];
  paused: boolean;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

const DynamicLineChart: React.FC<RadiationTrendViewProps> = ({
  width,
  chartHeight,
  data,
  windowSize,
}) => {
  const sensorList = useSensorListStore((state) => state.sensorList);

  const showingData = data.slice(-windowSize);
  // console.log(showingData);

  const source = showingData.map((d) => d.source);
  const time = showingData.map((d) =>
    new Date(d.timestamp).toLocaleTimeString("en-GB", { hour12: false })
  );

  const chartData = time.map((t, i) => {
    // 기본적으로 시간과 Sensor Mean을 포함한 객체 생성
    const chartDataItem: { [key: string]: number | string } = {
      name: t,
      Source: source[i],
    };

    // sensorList에 있는 각 key에 대해 해당 값을 추가
    sensorList.forEach((sensorKey: TSensorKey) => {
      chartDataItem[sensorKey] = showingData[i][sensorKey];
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
          dataKey="Source"
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

const RadiationTrendView: React.FC<RadiationTrendViewProps> = (
  props: RadiationTrendViewProps
) => {
  const { width, height, data, setPaused, paused } = props;
  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
      width={width}
      height={height}
    >
      <VStack spacing={6}>
        <HStack justifyContent="space-between" width="100%">
          <Text fontSize="2xl" fontWeight="bold" alignSelf="flex-start">
            Radiation Trend View
            {` (Current Src: ${data.slice(-1)[0].source.toFixed(2)}uSv/h)`}
          </Text>
          <IconButton
            onClick={() => setPaused((prev) => !prev)}
            aria-label={paused ? "Play" : "Pause"}
            icon={paused ? <BsPlay /> : <BsPause />}
            ml={4}
            borderRadius="full"
            variant="outline"
            size="lg"
            _hover={{ bg: "gray.100" }}
          />
        </HStack>

        <DynamicLineChart {...props} />
      </VStack>
    </Box>
  );
};
export default RadiationTrendView;
