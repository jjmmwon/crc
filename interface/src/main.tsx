import React from "react";
import ReactDOM from "react-dom/client";
import { Center, ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = extendTheme({
  fonts: {
    heading: "Pretendard Variable",
    body: "Pretendard Variable",
  },
  styles: {
    global: {
      body: {
        bg: "whitealpha.100",
        height: "100lvh",
        overflow: "hidden",
      },
    },
  },
  components: {
    Box: {
      variants: {
        section: {
          p: 4,
          borderWidth: 1,
          borderRadius: "lg",
          boxShadow: "md",
          bg: "white",
        },
      },
    },

    Text: {
      variants: {
        layout: {
          color: "gray.500",
        },
      },
    },
    Heading: {
      variants: {
        header: {
          fontSize: "xl",
          fontWeight: 700,
          color: "gray.900",
        },
        section: {
          fontSize: "md",
          fontWeight: 700,
          color: "gray.700",
        },
      },
    },
    Button: {
      variants: {
        layout: {
          color: "gray.700",
          backgroundColor: "transparent",
        },
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: "none",
        },
      },
    },
  },
});

theme.sizes.container["2xl"] = "1920px";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Center flexDir={"column"} minH={"100dvh"} w={"full"}>
          <App />
        </Center>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
