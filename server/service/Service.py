from datetime import datetime


class Service:
    def __init__(self):
        self.device_connection: datetime = None  # 디바이스 연결 상태
        self.setting = {
            "simulation": False,
            "level": 50,
            "maxScale": 1000,
            "circleSize1": 5,
            "circleSize2": 10,
            "circleSize3": 15,
            "circleOpacity1": 1,
            "circleOpacity2": 0.5,
            "circleOpacity3": 0.3,
            "circleColor1": 1,
            "circleColor2": 0.66,
            "circleColor3": 0.33,
        }
        self.sensor_dist = {f"sensor{i}": 1 for i in range(1, 50)}

    def set_simulation(self, simulation: bool):
        self.setting["simulation"] = simulation

    def set_setting(self, setting: dict):
        self.setting = setting

    def set_sensor_dist(self, sensor_dist: dict):
        self.sensor_dist = sensor_dist
        print(self.sensor_dist)
        return

    def get_simulation(self):
        return self.setting.get("simulation", False)

    def get_setting(self):
        return self.setting

    def get_data(self):
        if self.setting["simulation"]:
            return {"level": self.setting.level}
        else:
            return {"level": 0}  # source 값 계산한 결과 반환

    def update_device_connection(self):
        self.device_connection = datetime.now()

    def get_device_connection(self):
        return self.device_connection.isoformat() if self.device_connection else False


# 싱글톤 인스턴스 생성
service = Service()
