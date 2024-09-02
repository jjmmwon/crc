import React from "react";
import { SimpleGrid, Box, Text } from "@chakra-ui/react";

interface SensorGridProps {
  rows: number;
  columns: number;
}

interface SensorMapProps {
  width: string | number;
  rows: number;
  columns: number;
}

const SensorGrid: React.FC<SensorGridProps> = ({ rows, columns }) => {
  const gridItems = Array.from({ length: rows * columns }, (_, index) => (
    <Box
      key={index}
      bg="blue.500"
      aspectRatio={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      fontWeight="bold"
    >
      {"S" + (index + 1)}
    </Box>
  ));

  return (
    <SimpleGrid columns={columns} spacing={2}>
      {gridItems}
    </SimpleGrid>
  );
};

const SensorMap: React.FC = () => {
  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
      mx="auto"
      mt={4}
    >
      <Text fontSize="2xl" fontWeight="bold" alignSelf="flex-start">
        Sensor Map
      </Text>
      <SensorGrid rows={7} columns={7} />
    </Box>
  );
};

export default SensorMap;
