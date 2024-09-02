import { Box, Center, Flex } from "@chakra-ui/react";
import { Header, Settings, DynamicLineChartView } from "@components";
import SensorMap from "@components/SensorMap";

// import SensorMap from "@components/SensorMap";

function App() {
  return (
    <Center w="full" flexDir={"column"} p={0} m={0} overflowY={"hidden"}>
      <Header />
      <Flex
        w="full"
        px={4}
        py={4}
        flexDir={{ base: "column", md: "row" }} // 작은 화면에서는 수직, 큰 화면에서는 수평
        alignItems="flex-start" // 세로 정렬을 위쪽으로 설정
        justifyContent={{ base: "center", md: "flex-start" }} // 가운데 정렬
        gap={4} // Flex 아이템 간격 추가
      >
        <Box flexShrink={0} width="400px">
          <Settings width="100%" height={400} />
          <SensorMap />
        </Box>

        {/* 중간 LineChart 컴포넌트 */}
        <Box flex="1" w="100%" maxW="100%">
          <DynamicLineChartView
            width={"100%"}
            height={400}
            chartHeight={300}
            sensorList={["sensor1", "sensor2"]}
            windowSize={50}
            interval={1000}
          />
        </Box>
      </Flex>
    </Center>
  );
}

export default App;
