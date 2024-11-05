import React, { useState } from "react";
import { Box, Flex, HStack, Icon, Text, Input, Button } from "@chakra-ui/react";

import { usePostSensorDist } from "@hooks";
import { useSensorListStore, useSensorDistStore } from "@stores";
import { TSensorData, TSensorKey } from "@model";

import * as d3 from "d3";
import { BsBarChart, BsGear } from "react-icons/bs";

interface SensorCellProps {
  index: number;
  value: number;
  color: string;
  isEditing: boolean;
}

interface SensorGridProps {
  data: TSensorData;
  columns: number;
  isEditing: boolean;
}

interface RadiationMapViewProps {
  width: number;
  height: number;
  columns: number;
  data: TSensorData;
}

const SensorCell: React.FC<SensorCellProps> = ({
  index,
  value,
  color,
  isEditing,
}) => {
  const sensorList = useSensorListStore((state) => state.sensorList);
  const addSensor = useSensorListStore((state) => state.addSensor);
  const sensorDist = useSensorDistStore((state) => state.sensorDist);
  const updateSensorDist = useSensorDistStore(
    (state) => state.updateSensorDist
  );

  const handleClick = () => {
    addSensor(`sensor${index + 1}` as TSensorKey);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    updateSensorDist(`sensor${index + 1}` as TSensorKey, newValue);
  };

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      color="black"
      fontWeight="bold"
      boxSizing="border-box"
      p={1}
    >
      <Text mb={1}>{`S${index + 1}`}</Text>
      {isEditing ? (
        <Input
          placeholder="Enter distance"
          size="sm"
          textAlign="center"
          width="100%"
          height="70%"
          defaultValue={sensorDist[`sensor${index + 1}` as TSensorKey] || 0.5}
          onChange={handleInputChange}
          disabled={value === null}
          borderWidth={2}
        />
      ) : (
        <Box
          bg={color}
          width="100%"
          height="70%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          outline={
            sensorList.includes(`sensor${index + 1}` as TSensorKey)
              ? "3px solid green"
              : "1px solid green"
          }
          rounded="sm"
          cursor="pointer"
          onClick={value !== null ? handleClick : undefined}
          _hover={
            value !== null
              ? {
                  outline: "3px solid green",
                }
              : undefined
          }
        >
          {value !== null ? Math.round(value) : "off"}
        </Box>
      )}
    </Box>
  );
};

const SensorGrid: React.FC<SensorGridProps> = ({
  data,
  columns,
  isEditing,
}) => {
  const colorsScale = d3
    .scaleSequential(d3.interpolateInferno)
    .domain([10000, 0]);
  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${columns}, 1fr)`}
      gap={1}
      width="100%"
      height="100%"
    >
      {Array.from({ length: 49 }, (_, index) => (
        <SensorCell
          key={index}
          index={index}
          value={data[`sensor${index + 1}` as TSensorKey]}
          color={
            data[`sensor${index + 1}` as TSensorKey] != null
              ? colorsScale(data[`sensor${index + 1}` as TSensorKey])
              : "gray"
          }
          isEditing={isEditing}
        />
      ))}
    </Box>
  );
};

const Legend: React.FC = () => {
  const colorsScale = d3
    .scaleSequential(d3.interpolateInferno)
    .domain([10000, 0]);
  return (
    <Flex direction="column" align="center" mt={4} width="100%">
      <Text fontSize="sm" fontWeight="bold" mb={1}>
        Radiation Level (μSv/h)
      </Text>
      <Flex width="100%" position="relative" alignItems="center" height="30px">
        <Box
          width="90%"
          height="15px"
          mx="auto"
          bgGradient={`linear(to-r, ${colorsScale(0)}, ${colorsScale(
            5000
          )}, ${colorsScale(10000)})`}
        />
        <Text fontSize="xs" position="absolute" left={0} top="-18px">
          0
        </Text>
        <Text fontSize="xs" position="absolute" right={0} top="-18px">
          10000
        </Text>
      </Flex>
    </Flex>
  );
};

const RadiationMapView: React.FC<RadiationMapViewProps> = ({
  width,
  height,
  columns,
  data,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleIconClick = () => {
    setIsEditing((prev) => !prev);
  };

  const sensorDist = useSensorDistStore((state) => state.sensorDist);
  const handlePostSensorDist = usePostSensorDist();
  return (
    <Box
      width={width}
      height={height}
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
      display="flex"
      flexDirection="column"
    >
      <HStack justifyContent="space-between" width="100%">
        <Text fontSize="2xl" fontWeight="bold" alignSelf="flex-start">
          Radiation Map View
        </Text>
        <Icon
          as={isEditing ? BsBarChart : BsGear}
          boxSize={6}
          cursor="pointer"
          onClick={handleIconClick}
        />
      </HStack>
      <Box flex={1} overflow="hidden">
        <SensorGrid data={data} columns={columns} isEditing={isEditing} />
      </Box>
      {isEditing ? (
        <Button
          mt={4}
          colorScheme="blue"
          width="100%"
          onClick={() => handlePostSensorDist(sensorDist)}
        >
          Send Distance Settings
        </Button>
      ) : (
        <Legend />
      )}
    </Box>
  );
};

export default RadiationMapView;
