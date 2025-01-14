from flask import Blueprint, request, jsonify
from service import service
from .db import fetch_sensor_data

interface_bp = Blueprint("interface", __name__, url_prefix="/api/interface")


@interface_bp.route("/getSensorData", methods=["GET"])
def get_data():
    window_size = int(request.args.get("windowSize", 50))
    data = fetch_sensor_data()
    service.update_sensor_data(data)

    return jsonify(service.get_data_from_interface(window_size))


@interface_bp.route("/getDeviceConnection", methods=["GET"])
def get_device_connection():
    return jsonify({"connected": service.get_device_connection()})


@interface_bp.route("/setSensorDist", methods=["POST"])
def set_sensor_dist():
    try:
        data = request.json
        service.set_sensor_dist(data)

        return jsonify({"success": True, "sensorDist": data}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@interface_bp.route("/setSettings", methods=["POST"])
def set_settings():
    try:
        data = request.json
        service.set_setting(data)

        return jsonify({"success": True, "settings": data}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@interface_bp.route("/setSimulation", methods=["POST"])
def set_simulation():
    """simulation mode 설정"""
    try:
        data: dict = request.json
        simulation = data.get("simulation", False)
        service.set_simulation(simulation)

        return jsonify({"success": True, "simulation": simulation}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
