from flask import Blueprint, jsonify
from service import service
from .db import fetch_sensor_data

device_bp = Blueprint("device", __name__, url_prefix="/api/device")


@device_bp.route("/getData", methods=["GET"])
def get_data():
    """device client에 데이터를 제공."""
    service.update_device_connection()  # device 접속 시간 최신화

    # return jsonify(service.get_data())
    return jsonify(service.get_setting())


@device_bp.route("/getSetting", methods=["GET"])
def get_setting():
    return jsonify(service.get_setting())
