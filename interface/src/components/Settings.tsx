import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Switch,
  Button,
  Badge,
  Divider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { usePostSettings } from "@hooks";
import { useIntervalFetch } from "@hooks";
import { ISettings, TConnection } from "@model";

interface SettingsProps {
  width: string | number;
  height: string | number;
}

const Settings: React.FC<SettingsProps> = ({ width, height }) => {
  const [settings, setSettings] = useState<ISettings>({
    simulation: false,
    level: 50,
    maxScale: 500,
    circleSize1: 0.03,
    circleSize2: 0.7,
    circleSize3: 1.5,
    circleAlpha1: 0.5,
    circleAlpha2: 0.5,
    circleAlpha3: 0.5,
    circleColor1: 1,
    circleColor2: 1 / 3,
    circleColor3: 1 / 10,
  });

  const updateSetting = (key: keyof ISettings, value: number | boolean) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  const handlePostSettings = usePostSettings();

  const { data: isConnected } = useIntervalFetch<TConnection>(
    "api/interface/getDeviceConnection",
    1000
  );

  let connected = false;

  if (isConnected?.connected) {
    const currentTime = new Date();
    const connectionTime = new Date(isConnected.connected as string);
    const diff = Math.abs(currentTime.getTime() - connectionTime.getTime());

    connected = diff < 10000;
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
        <HStack justifyContent="space-between" width="100%">
          <Text fontSize="2xl" fontWeight="bold" alignSelf="flex-start">
            Settings
          </Text>
          <HStack>
            <Text fontSize="lg">Device Connection</Text>
            <Badge colorScheme={connected ? "green" : "red"}>
              {connected ? "ON" : "OFF"}
            </Badge>
          </HStack>
        </HStack>

        <Box
          width="100%"
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          p={4}
        >
          <VStack align="stretch" spacing={3}>
            <Text fontSize="lg" fontWeight="bold">
              Simulation Settings
            </Text>
            <HStack justifyContent="space-between" width="100%">
              <Text fontSize="md">Simulation Mode</Text>
              <Switch
                isChecked={settings.simulation}
                onChange={() => {
                  const newSimulation = !settings.simulation;
                  updateSetting("simulation", newSimulation); // Update state
                }}
                colorScheme="blue"
              />
            </HStack>
            <HStack justifyContent="space-between" width="100%">
              <Text fontSize="md">Level (0~100)</Text>
              <NumberInput
                value={settings.level}
                min={0}
                max={100}
                onChange={(_, val) => updateSetting("level", val)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>

            <Button
              colorScheme="blue"
              onClick={() => handlePostSettings(settings)}
            >
              Send Simulation Settings
            </Button>
          </VStack>
        </Box>

        <Divider />

        <Box
          width="100%"
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          p={4}
        >
          <VStack align="stretch" spacing={3}>
            <Text fontSize="lg" fontWeight="bold">
              Scale Settings
            </Text>

            {/* Max Scale */}
            <HStack justifyContent="space-between" width="100%">
              <Text fontSize="md">Max Value (uSv/h)</Text>
              <NumberInput
                value={settings.maxScale}
                min={0}
                max={10000}
                width={"120px"}
                onChange={(_, valueAsNumber) =>
                  updateSetting("maxScale", valueAsNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>

            <Button
              colorScheme="blue"
              onClick={() => handlePostSettings(settings)}
            >
              Send Scale Settings
            </Button>
          </VStack>
        </Box>

        <Divider />

        <Box
          width="100%"
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          p={4}
        >
          <VStack align="stretch" spacing={3}>
            <Text fontSize="lg" fontWeight="bold">
              Radiation Circle Settings
            </Text>

            {/* Circle Size Settings */}
            <HStack justifyContent="space-between" width="100%">
              <Text fontSize="md">Circle Size 1, 2, 3 (meter)</Text>
              <HStack>
                {[1, 2, 3].map((num) => (
                  <NumberInput
                    width={"80px"}
                    ms={2}
                    key={`circleSize${num}`}
                    value={
                      settings[`circleSize${num}` as keyof ISettings] as number
                    }
                    min={0}
                    max={10}
                    step={0.01}
                    onChange={(_, valueAsNumber) =>
                      updateSetting(
                        `circleSize${num}` as keyof ISettings,
                        valueAsNumber
                      )
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                ))}
              </HStack>
            </HStack>

            <HStack justifyContent="space-between" width="100%">
              <Text fontSize="md">Circle Alpha 1, 2, 3 (0~1)</Text>
              <HStack>
                {[1, 2, 3].map((num) => (
                  <NumberInput
                    width={"80px"}
                    ms={2}
                    key={`circleAlpha${num}`}
                    value={
                      settings[`circleAlpha${num}` as keyof ISettings] as number
                    }
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={(_, valueAsNumber) =>
                      updateSetting(
                        `circleAlpha${num}` as keyof ISettings,
                        valueAsNumber
                      )
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                ))}
              </HStack>
            </HStack>

            <HStack justifyContent="space-between" width="100%">
              <Text fontSize="md">Circle Color 1, 2, 3 (0~1)</Text>
              <HStack>
                {[1, 2, 3].map((num) => (
                  <NumberInput
                    width={"80px"}
                    ms={2}
                    key={`circleColor${num}`}
                    value={
                      settings[`circleColor${num}` as keyof ISettings] as number
                    }
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={(_, valueAsNumber) =>
                      updateSetting(
                        `circleColor${num}` as keyof ISettings,
                        valueAsNumber
                      )
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                ))}
              </HStack>
            </HStack>

            <Button
              colorScheme="blue"
              onClick={() => handlePostSettings(settings)}
            >
              Send Radiation Circle Settings
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Settings;
