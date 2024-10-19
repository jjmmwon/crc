import { useToast } from "@chakra-ui/react";
import { TSensorDist } from "@model";

const usePostSensorDist = () => {
  const toast = useToast();

  const handlePostSensorDist = async (sensorDist: TSensorDist) => {
    try {
      const response = await fetch("/api/interface/setSensorDist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sensorDist),
      });

      if (response.ok) {
        toast({
          title: "Sensor distances updated.",
          description: "Sensor distances has been updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error updating sensor distances.",
          description: "There was an issue updating the sensor distances.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error updating sensor distances.",
        description: "There was an issue updating the sensor distances.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Failed to update sensor distances:", error);
    }
  };

  return handlePostSensorDist;
};

export default usePostSensorDist;
