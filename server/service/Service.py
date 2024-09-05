from datetime import datetime
import random


class Service:
    def __init__(self):
        self.simul_config = {
            "level": 0,
        }  # interface와 device에서 공유하는 데이터
        self.simulation = False  # 시뮬레이션 모드 상태
        self.device_connection: datetime = None  # 디바이스 연결 상태

    def get_simul_config(self):
        self.simul_config = {"level": random.randint(0, 100)}

        return self.simul_config

    def set_simul_config(self, level: float):
        self.simul_config["level"] = level

    def set_simulation(self, simulation: bool):
        self.simulation = simulation

    def get_simulation(self):
        return self.simulation

    def update_device_connection(self):
        self.device_connection = datetime.now()

    def get_device_connection(self):
        return self.device_connection.isoformat() if self.device_connection else False


# 싱글톤 인스턴스 생성
service = Service()
