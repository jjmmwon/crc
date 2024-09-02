from datetime import datetime


class Service:
    def __init__(self):
        self.simul_config = {
            "brightness": 50,
            "scale": 0.4,
        }  # interface와 device에서 공유하는 데이터
        self.simulation = False  # 시뮬레이션 모드 상태
        self.device_connection: datetime = None  # 디바이스 연결 상태

    def get_simul_config(self):
        return self.simul_config

    def set_simul_config(self, brightness: float, scale: float):
        self.simul_config["brightness"] = brightness
        self.simul_config["scale"] = scale

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
