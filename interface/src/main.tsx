import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";

const theme = extendTheme({
  fonts: {
    heading: "Pretendard Variable",
    body: "Pretendard Variable",
  },
  styles: {
    global: {
      body: {
        bg: "whitealpha.100",
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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
