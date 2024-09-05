import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Switch,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  Badge,
} from "@chakra-ui/react";
import { usePostSimulation } from "../hooks/usePostSimulation";
import { usePostSettings } from "../hooks/usePostSettings";
import { useIntervalFetch } from "@hooks";
import { TConnection } from "@model";

interface SettingsProps {
  width: string | number;
  height: string | number;
}

const Settings: React.FC<SettingsProps> = ({ width, height }) => {
  // State for settings
  const [simulation, setSimulation] = useState(false);
  const [level, setLevel] = useState(50); // Default value

  const handlePostSimulation = usePostSimulation();
  const handlePostSettings = usePostSettings();

  const { data: isConnected } = useIntervalFetch<TConnection>(
    "api/interface/getDeviceConnection",
    3000
  );

  let connected = false;

  if (isConnected?.connected) {
    const currentTime = new Date();
    const connectionTime = new Date(isConnected.connected as string);
    const diff = Math.abs(currentTime.getTime() - connectionTime.getTime());

    connected = diff < 30000;
  }

  return (
    <Box
      p={5}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
      width={width}
      mx="auto"
      height={height}
    >
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold" alignSelf="flex-start">
          Settings
        </Text>

        <HStack justifyContent="space-between" width="100%">
          <Text fontSize="lg">Device Connection</Text>
          <Badge colorScheme={connected ? "green" : "red"}>
            {connected ? "ON" : "OFF"}
          </Badge>
        </HStack>

        <HStack justifyContent="space-between" width="100%">
          <Text fontSize="lg">Simulation Mode</Text>
          <Switch
            isChecked={simulation}
            onChange={() => {
              const newSimulation = !simulation;
              setSimulation(newSimulation); // Update state
              handlePostSimulation(newSimulation); // Post immediately when changed
            }}
            colorScheme="blue"
          />
        </HStack>

        {/* Brightness Slider */}
        <VStack align="stretch" width="100%">
          <Text fontSize="lg">Level: {level}</Text>
          <Slider
            aria-label="brightness-slider"
            value={level}
            min={0}
            max={100}
            onChange={(val) => setLevel(val)}
            colorScheme="blue"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </VStack>

        {/* Send Button */}
        <Button colorScheme="blue" onClick={() => handlePostSettings(level)}>
          Send Settings
        </Button>
      </VStack>
    </Box>
  );
};

export default Settings;
