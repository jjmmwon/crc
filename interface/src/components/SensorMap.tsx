import React from "react";
import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import { useSensorListStore } from "@stores";
import { TSensorData } from "@model";
import * as d3 from "d3";

interface SensorGridProps {
  rows: number;
  columns: number;
  data: TSensorData[];
}

interface SensorMapProps {
  width: string | number;
  rows: number;
  columns: number;
  data: TSensorData[];
}

const SensorGrid: React.FC<SensorGridProps> = ({ rows, columns, data }) => {
  const sensorList = useSensorListStore((state) => state.sensorList);
  const addSensor = useSensorListStore((state) => state.addSensor);

  const handleClick = (index: number) => {
    addSensor(`sensor${index + 1}`);
  };

  const colorsScale = d3.scaleSequential(d3.interpolateInferno).domain([50, 0]);
  const colors = Array.from({ length: rows * columns }, (_, index) => {
    const sensor = data.slice(-1)[0][`sensor${index + 1}`];
    return sensor ? colorsScale(sensor) : "green";
  });

  console.log(sensorList.includes(`sensor${14}`));

  const gridItems = Array.from({ length: rows * columns }, (_, index) => (
    <Box
      key={index}
      bg={colors[index]}
      borderWidth={sensorList.includes(`sensor${index + 1}`) ? "5px" : "1px"}
      rounded="sm"
      borderColor={
        sensorList.includes(`sensor${index + 1}`) ? "green.700" : "green.300"
      }
      aspectRatio={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="black"
      fontWeight="bold"
      cursor="pointer"
      onClick={() => handleClick(index)}
      _hover={{
        borderColor: "green.300",
        borderWidth: "5px",
      }}
    >
      {"S" + (index + 1)}
    </Box>
  ));

  return (
    <SimpleGrid columns={columns} spacing={1}>
      {gridItems}
    </SimpleGrid>
  );
};

const SensorMap: React.FC<SensorMapProps> = ({
  width,
  rows,
  columns,
  data,
}) => {
  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
      width={width}
      mx="auto"
    >
      <Text
        fontSize="2xl"
        fontWeight="bold"
        alignSelf="flex-start"
        marginBottom={2}
      >
        Sensor Map
      </Text>
      <SensorGrid rows={rows} columns={columns} data={data} />
    </Box>
  );
};

export default SensorMap;
