from threading import Thread
import time
from flask_socketio import send, emit

from SensorPoller import SensorPoller


class SocketHandler:
    def __init__(self, socketio, poller: SensorPoller):
        self.socketio = socketio
        self.poller = poller

        self._stop_thread = False
        self.thread = Thread(target=self.update_data, args=(poller,))
        self.thread.daemon = True

    def handle_connect(self):
        print("Client connected")
        send("Connected")

    def handle_disconnect(self):
        print("Disconnected")

    def start(self):
        self.thread.start()

    def stop(self):
        self._stop_thread = True
        self.thread.join()

    def update_data(self):
        while True:
            sensor_data = self.poller.get_sensor_data()
            emit("newSensorData", sensor_data)

            time.sleep(1)
