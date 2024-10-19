from dataclasses import dataclass
from datetime import datetime
from pydantic import BaseModel, Field
from typing import Dict, Union


class DeviceGroup(BaseModel):
    devices: Dict[str, int]
    device_count: int


class SensorModel(BaseModel):
    time: str
    status: str
    device_group: Dict[str, DeviceGroup] = Field(..., alias="device_group")
    device_count: int


# # Example usage
# example_json = {
#     "time": "2024-09-03 14:30:16",
#     "device_group": {
#         "192.168.0.6": {
#             "status": "VALID",
#             "devices": {"MSV-017": 0, "MSV-018": 1, "MSV-032": 0},
#         }
#     },
#     "device_count": 3,
# }

# server_data = SensorModel(**example_json).model_dump()
# print(server_data)


# devices = server_data.get("device_group").get("192.168.0.6").get("devices")
# sensor_data = {}
# for i in range(1, 50):
#     sensor_data[f"sensor{i}"] = devices.get(f"MSV-0{i}", 0)

# sensor_data["sensorMean"] = sum(sensor_data.values()) / int(
#     server_data.get("device_count")
# )
# sensor_data["timestamp"] = datetime.strptime(
#     server_data.get("time"), "%Y-%m-%d %H:%M:%S"
# ).isoformat()


# print(sensor_data)
