import { Center, Flex, VStack } from "@chakra-ui/react";
import {
  Header,
  Settings,
  RadiationTrendView,
  RadiationMapView,
  DynamicBarChartView,
} from "@components";
import { useIntervalFetch } from "@hooks";
import { TSensorData } from "@model";
import { useState } from "react";

// import SensorMap from "@components/SensorMap";
// query를 간편하게 사용하고 싶으면 react-query를 사용하자.

function App() {
  const [paused, setPaused] = useState(false);
  const { data } = useIntervalFetch<TSensorData[]>(
    "api/interface/getSensorData",
    1000,
    paused
  );
  if (!data) return;

  return (
    <Center w="full" flexDir={"column"} p={0} m={0} overflowY={"hidden"}>
      <Header />
      <Flex
        w="full"
        height="calc(100vh - 80px)"
        px={4}
        py={4}
        flexDir={{ base: "column", md: "row" }} // 작은 화면에서는 수직, 큰 화면에서는 수평
        alignItems="flex-start" // 세로 정렬을 위쪽으로 설정
        justifyContent={{ base: "center", md: "flex-start" }} // 가운데 정렬
        gap={3} // Flex 아이템 간격 추가
      >
        {/* 중간 LineChart 컴포넌트 */}
        <VStack flex="1" w="100%" maxW="100%" gap={3}>
          <RadiationTrendView
            width={"100%"}
            height={400}
            chartHeight={300}
            data={data}
            sensorList={["sensor1", "sensor2"]}
            windowSize={50}
            paused={paused}
            setPaused={setPaused}
          />

          <DynamicBarChartView
            width={"100%"}
            height={"100%"}
            chartHeight={300}
            data={data}
            windowSize={50}
          />
        </VStack>
        <VStack>
          {/* <SensorMap
            width={500}
            height={500}
            data={data}
            rows={7}
            columns={7}
          />
           */}
          <RadiationMapView
            width={500}
            height={800}
            data={data.slice(-1)[0]}
            columns={7}
          />
        </VStack>
        <VStack width="500px" gap={3} height="100%">
          <Settings width="100%" height="100%" />
        </VStack>
      </Flex>
    </Center>
  );
}

export default App;
