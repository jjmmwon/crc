import { useState, useEffect } from "react";

type TFetchedData<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const useIntervalFetch = <T,>(
  url: string,
  interval: number = 1000
): TFetchedData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);

        setData(result);
        setLoading(false);
        setError(null);
      } catch (e) {
        setError((e as Error).message);
        setLoading(false);
      }
    };

    fetchData(); // 초기 데이터 로드

    const intervalId = setInterval(fetchData, interval); // 1초마다 데이터 로드

    return () => clearInterval(intervalId); // 클린업 함수
  }, [url, interval]);

  return { data, loading, error };
};

export default useIntervalFetch;
