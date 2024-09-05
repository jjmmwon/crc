from datetime import datetime
import random
import requests
from model.SensorModel import SensorModel


class SensorPoller:
    def __init__(self, poll_interval: int = 1, sensor_address: str = None):
        self.poll_interval = poll_interval  # Polling interval in seconds
        self.sensor_address = sensor_address  # Address to request sensor data

    def request_sensor_data(self):
        # Requests sensor data; can be tested independently

        example_json = {
            "time": "2024-09-03 14:30:16",
            "device_group": {
                "192.168.0.6": {
                    "status": "VALID",
                    "devices": {"MSV-017": 0, "MSV-018": 1, "MSV-032": 0},
                }
            },
            "device_count": 3,
        }
        sensor_data = {}

        devices = example_json.get("device_group").get("192.168.0.6").get("devices")

        total, cnt = 0, 0
        for i in range(1, 50):
            sensor_data[f"sensor{i}"] = devices.get(f"MSV-0{i}", -1)
            total += sensor_data[f"sensor{i}"] if sensor_data[f"sensor{i}"] != -1 else 0
            cnt += 1 if sensor_data[f"sensor{i}"] != -1 else 0

        sensor_data["sensorMean"] = total / cnt if cnt > 0 else 0
        sensor_data["timestamp"] = datetime.strptime(
            example_json.get("time"), "%Y-%m-%d %H:%M:%S"
        ).isoformat()

        # print(sensor_data)
        return sensor_data

    def _generate_sample_data(self):
        # Generates sample data for testing
        sensor_data = {f"sensor{i}": 10 + random.uniform(0, 10) for i in range(1, 50)}
        sensor_data["sensorMean"] = sum(sensor_data.values()) / len(sensor_data)
        sensor_data["timestamp"] = datetime.now().isoformat()

        print(sensor_data)
        return sensor_data


def test_request_sensor_data():
    # Test function for `request_sensor_data`
    sensor_poller = SensorPoller()  # No sensor address provided for testing sample data
    sensor_data = sensor_poller.request_sensor_data()  # Calling the method directly
    print("Test Output:", sensor_data)


if __name__ == "__main__":
    test_request_sensor_data()  # Run the test function
