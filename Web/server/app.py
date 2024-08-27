import os
from threading import Thread
import time

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_socketio import SocketIO, send, emit

from SensorPoller import SensorPoller
from SocketHandler import SocketHandler


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

sensor_poller = SensorPoller(poll_interval=1)
socket_handler = SocketHandler(socketio, poller=sensor_poller)


# 전역 변수로 큐브 데이터를 저장
send_data = {"brightness": 50, "scale": 0.4}


@app.route("/")
def index():
    return send_from_directory(os.getcwd(), "index.html")


@app.route("/getData", methods=["GET"])
def get_data():
    return jsonify(send_data)


@app.route("/updateData", methods=["POST"])
def update_data():
    data = request.json
    send_data["brightness"] = float(data["brightness"])
    send_data["scale"] = float(data["scale"])
    return jsonify(success=True)


socketio.on_event("connect", socket_handler.handle_connect)
socketio.on_event("disconnect", socket_handler.handle_disconnect)


if __name__ == "__main__":
    # sensor data polling 및 socket handler 시작
    sensor_poller.start_polling()
    socket_handler.start()

    # socketio 시작
    socketio.run(app, host="localhost", port=50005)
