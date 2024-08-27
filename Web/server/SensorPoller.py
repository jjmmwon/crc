import random
import time
import threading
import requests

import duckdb


class SensorPoller:
    def __init__(
        self, poll_interval: int = 1, sensor_address: str = None, db_path: str = None
    ):
        self.poll_interval = poll_interval  # 풀링 간격 (초)
        self.sensor_address = sensor_address  # 센서 데이터를 요청할 주소
        self.db_path = db_path if db_path else "sensor_data.db"
        self._initialize_db()

        self.sensor_data = []  # 센서 데이터를 저장할 변수
        self._polling_thread = None  # 백그라운드 스레드
        self._stop_event = threading.Event()  # 스레드 중지를 위한 이벤트

    def _initialize_db(self):
        print("Initializing")
        self.conn = duckdb.connect(self.db_path)

        sensor_columns = ", ".join([f"sensor{i} INTEGER" for i in range(1, 50)])
        init_query = f"""
            CREATE TABLE IF NOT EXISTS sensor_data (
                timestamp TIMESTAMP,
                {sensor_columns}
            )
        """
        self.conn.execute(init_query)

    def start_polling(self):
        # 스레드를 시작하고 풀링을 시작
        self._polling_thread = threading.Thread(target=self._poll_sensor_data)
        self._polling_thread.daemon = True  # 메인 프로그램 종료 시 같이 종료되도록 설정
        self._polling_thread.start()

    def stop_polling(self):
        # 스레드 중지
        self._stop_event.set()
        if self._polling_thread:
            self._polling_thread.join()

    def get_sensor_data(self):
        # 현재 센서 데이터를 반환
        return self.sensor_data

    def _poll_sensor_data(self):
        while not self._stop_event.is_set():
            self.sensor_data = self._request_sensor_data()
            print(self.sensor_data)
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
                sensor_data["timestamp"] = time.time()
                self.sensor_data.append(sensor_data)

                return sensor_data

        else:
            # 주소가 없으면 예시 데이터 반환
            sensor_data = {f"sensor{i}": random.randint(1, 50) for i in range(1, 50)}
            sensor_data["timestamp"] = time.time()

            self.sensor_data.append(sensor_data)
            return sensor_data

    def _save_to_db(self, sensor_data: dict):
        if len(sensor_data.values()) != 49:
            raise ValueError("Data should have 49 sensors")

        sensor_columns = ", ".join([f"sensor{i}" for i in range(1, 50)])
        sensor_values = ", ".join(
            [str(sensor_data[f"sensor{i}"]) for i in range(1, 50)]
        )
        insert_query = f"""
            INSERT INTO sensor_data (timestamp, {sensor_columns})
            VALUES (CURRENT_TIMESTAMP, {sensor_values})
        """

        self.conn.execute(insert_query)
