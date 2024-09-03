import { Center, Flex, VStack } from "@chakra-ui/react";
import {
  Header,
  Settings,
  DynamicLineChartView,
  DynamicBarChartView,
  // DynamicBarChartView,
} from "@components";
import SensorMap from "@components/SensorMap";
import { useIntervalFetch } from "@hooks";
import { TSensorData } from "@model";

// import SensorMap from "@components/SensorMap";
// query를 간편하게 사용하고 싶으면 react-query를 사용하자.

function App() {
  const { data } = useIntervalFetch<TSensorData[]>(
    "api/interface/getSensorData",
    5000
  );
  if (!data) return;

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
        gap={3} // Flex 아이템 간격 추가
      >
        {/* 중간 LineChart 컴포넌트 */}
        <VStack flex="1" w="100%" maxW="100%" gap={3}>
          <DynamicLineChartView
            width={"100%"}
            height={400}
            chartHeight={300}
            data={data}
            sensorList={["sensor1", "sensor2"]}
            windowSize={50}
          />
          <DynamicBarChartView
            width={"100%"}
            height={"100%"}
            chartHeight={300}
            data={data}
            windowSize={50}
          />
        </VStack>
        <VStack width="400px" gap={3}>
          <Settings width="100%" height={400} />
          <SensorMap width="100%" rows={7} columns={7} data={data} />
        </VStack>
      </Flex>
    </Center>
  );
}

export default App;
