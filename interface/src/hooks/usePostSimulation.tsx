import { useToast } from "@chakra-ui/react";

export const usePostSimulation = () => {
  const toast = useToast();

  const handlePostSimulation = async (newSimulation: boolean) => {
    try {
      const response = await fetch("/api/interface/setSimulation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ simulation: newSimulation }),
      });

      if (response.ok) {
        toast({
          title: "Simulation mode updated.",
          description: `Simulation mode has been set to ${
            newSimulation ? "ON" : "OFF"
          }.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error updating simulation mode.",
          description: "There was an issue updating the simulation mode.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error updating simulation mode.",
        description: "There was an issue updating the simulation mode.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Failed to update simulation mode:", error);
    }
  };

  return handlePostSimulation;
};
