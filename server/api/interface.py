from flask import Blueprint, request, jsonify
from service import service
from .db import fetch_sensor_data

interface_bp = Blueprint("interface", __name__, url_prefix="/api/interface")


@interface_bp.route("/getSensorData", methods=["GET"])
def get_data():
    data = fetch_sensor_data()
    return jsonify(data)


@interface_bp.route("/getDeviceConnection", methods=["GET"])
def get_device_connection():
    return jsonify({"connected": service.get_device_connection()})


@interface_bp.route("/setSimulConfig", methods=["POST"])
def update_data():
    data = request.json
    print(data)
    service.set_simul_config(float(data["level"]))
    return jsonify(success=True)


@interface_bp.route("/setSimulation", methods=["POST"])
def set_simulation():
    """simulation mode 설정"""
    try:
        data = request.json
        simulation = data.get("simulation", False)
        service.set_simulation(simulation)

        return jsonify({"success": True, "simulation": simulation}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
