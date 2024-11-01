from datetime import datetime


class Service:
    def __init__(self):
        self.device_connection: datetime = None  # 디바이스 연결 상태
        self.setting = {
            "simulation": False,
            "level": 50,
            "maxScale": 100,
            "circleSize1": 0.03,
            "circleSize2": 0.12,
            "circleSize3": 0.36,
            "circleAlpha1": 0.5,
            "circleAlpha2": 0.5,
            "circleAlpha3": 0.5,
            "circleColor1": 1,
            "circleColor2": 1 / 16,
            "circleColor3": 1 / 36,
        }
        self.source = None
        self.sensor_data = {
            **{f"sensor{i}": None for i in range(1, 50)},
            "source": None,
        }
        self.sensor_dist = {f"sensor{i}": 0.5 for i in range(1, 50)}

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
        if self.setting["simulation"]:
            return self.setting

        else:
            setting = self.setting.copy()
            setting["level"] = self.source

            return setting

    def update_device_connection(self):
        self.device_connection = datetime.now()

    def get_device_connection(self):
        return self.device_connection.isoformat() if self.device_connection else False

    def update_sensor_data(self, data):
        self.sensor_data = data
        self.source = self._compute_source(self.sensor_data[-1])

    def get_data_from_interface(self, window_size=50):
        sensor_data = self.sensor_data[-window_size:]

        sensor_data_with_source = [
            {**data, "source": self._compute_source(data)} for data in sensor_data
        ]

        return sensor_data_with_source

    def get_data_from_device(self):
        if self.setting["simulation"]:
            return {"level": self.setting.level}
        else:
            return {"level": self.source}

    def _compute_source(self, data):
        keys = [f"sensor{i}" for i in range(1, 50)]

        valid_sources = [
            (float(self.sensor_dist[key]) ** 2) * 100 * float(data[key])
            for key in keys
            if data[key] is not None and self.sensor_dist[key] is not None
        ]

        if not valid_sources:
            return 0

        return sum(valid_sources) / len(valid_sources)


# 싱글톤 인스턴스 생성
service = Service()
