import { useToast } from "@chakra-ui/react";

export const usePostSettings = () => {
  const toast = useToast();

  const handlePostSettings = async (level: number) => {
    const settings = {
      level: level,
    };

    try {
      const response = await fetch("/api/interface/setSimulConfig", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        toast({
          title: "Settings updated.",
          description: "Level has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error updating settings.",
          description: "There was an issue updating the settings.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error updating settings.",
        description: "There was an issue updating the settings.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Failed to update settings:", error);
    }
  };

  return handlePostSettings;
};
