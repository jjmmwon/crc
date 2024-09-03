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
  const [brightness, setBrightness] = useState(50); // Default brightness value
  const [scale, setScale] = useState(0.4); // Default scale value

  const handlePostSimulation = usePostSimulation();
  const handlePostSettings = usePostSettings();

  const { data: isConnected } = useIntervalFetch<TConnection>(
    "api/interface/getDeviceConnection",
    3000
  );

  if (isConnected?.connected) {
    const currentTime = new Date();
    const connectionTime = new Date(isConnected.connected as string);
    const diff = Math.abs(currentTime.getTime() - connectionTime.getTime());
    return diff > 3000;
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
          <Badge colorScheme={isConnected ? "green" : "red"}>
            {isConnected ? "ON" : "OFF"}
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
          <Text fontSize="lg">Brightness: {brightness}%</Text>
          <Slider
            aria-label="brightness-slider"
            value={brightness}
            min={0}
            max={100}
            onChange={(val) => setBrightness(val)}
            colorScheme="blue"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </VStack>

        {/* Scale Slider */}
        <VStack align="stretch" width="100%">
          <Text fontSize="lg">Scale: {scale}</Text>
          <Slider
            aria-label="scale-slider"
            value={scale}
            min={0.1}
            max={2.0}
            step={0.1}
            onChange={(val) => setScale(val)}
            colorScheme="blue"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </VStack>

        {/* Send Button */}
        <Button
          colorScheme="blue"
          onClick={() => handlePostSettings(brightness, scale)}
        >
          Send Settings
        </Button>
      </VStack>
    </Box>
  );
};

export default Settings;
