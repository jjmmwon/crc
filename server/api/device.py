from flask import Blueprint, jsonify
from service import service

device_bp = Blueprint("device", __name__, url_prefix="/api/device")


@device_bp.route("/getData", methods=["GET"])
def get_data():
    """device client에 데이터를 제공."""
    service.update_device_connection()  # device 접속 시간 최신화

    simulation = service.get_simulation()

    if simulation:
        pass
    else:
        pass

    return jsonify(service.get_simul_config())
