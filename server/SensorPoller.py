from datetime import datetime
import random
import time
import threading
import requests

import duckdb


class SensorPoller:
    def __init__(
        self,
        poll_interval: int = 1,
        sensor_address: str = None,
        db_path: str = "sensor_data.db",
    ):
        self.poll_interval = poll_interval  # 풀링 간격 (초)
        self.sensor_address = sensor_address  # 센서 데이터를 요청할 주소
        self.db_path = db_path

        self._initialize_db()
        self._stop_event = threading.Event()  # 스레드 중지를 위한 이벤트
        self._polling_thread = None  # 백그라운드 스레드

    def _initialize_db(self):
        print("Initializing Database")
        self.conn = duckdb.connect(self.db_path)

        sensor_columns = ", ".join([f"sensor{i} INTEGER" for i in range(1, 50)])
        init_query = f"""
            CREATE TABLE IF NOT EXISTS sensor_data (
                timestamp DATETIME,
                sensorMean FLOAT,
                {sensor_columns}
            )
        """
        self.conn.execute(init_query)

    def start_polling(self):
        # 스레드를 시작하고 풀링을 시작
        if not self._polling_thread or not self._polling_thread.is_alive():
            self._polling_thread = threading.Thread(target=self._poll_sensor_data)
            self._polling_thread.start()

    def stop_polling(self):
        # 스레드 중지
        self._stop_event.set()
        if self._polling_thread:
            self._polling_thread.join()

    def _poll_sensor_data(self):
        while not self._stop_event.is_set():
            self.sensor_data = self._request_sensor_data()
            self._save_to_db(self.sensor_data)
            time.sleep(self.poll_interval)

    def _request_sensor_data(self):
        # 센서 데이터를 요청하는 부분
        if self.sensor_address:
            # 센서 주소로 요청
            response = requests.get(self.sensor_address)
            if response.status_code == 200:
                # 성공적으로 데이터를 받으면 반환
                sensor_data = response.json()
                sensor_data["sensorMean"] = sum(sensor_data.values()) / len(sensor_data)
                sensor_data["timestamp"] = datetime.now().isoformat()
                print(sensor_data)
                return sensor_data
            print(f"Failed to get sensor data: {response.status_code}")
        else:
            # 주소가 없으면 예시 데이터 반환
            sensor_data = {
                f"sensor{i}": 10 + random.uniform(0, 10) for i in range(1, 50)
            }
            sensor_data["sensorMean"] = sum(sensor_data.values()) / len(sensor_data)
            sensor_data["timestamp"] = datetime.now().isoformat()

            print(sensor_data)
            return sensor_data

    def _save_to_db(self, sensor_data: dict):
        # 센서 데이터를 DB에 저장
        cursor = self.conn.execute("SELECT * FROM sensor_data")

        columns = ", ".join(sensor_data.keys())
        values = ", ".join(
            (
                f"'{sensor_data[col]}'"
                if isinstance(sensor_data[col], str)
                else str(sensor_data[col])
            )
            for col in sensor_data.keys()
        )

        insert_query = f"""
            INSERT INTO sensor_data ({columns})
            VALUES ({values})
        """
        self.conn.execute(insert_query)


if __name__ == "__main__":
    sensor_poller = SensorPoller(poll_interval=1)
    sensor_poller.start_polling()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        sensor_poller.stop_polling()
        print("Exiting")