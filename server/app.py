import argparse
import os

from flask import Flask, send_from_directory
from flask_cors import CORS

from api.interface import interface_bp
from api.device import device_bp
from service import service  # Service import for initialization

app = Flask(__name__, static_folder="../interface/dist")
CORS(app)


app.register_blueprint(interface_bp)
app.register_blueprint(device_bp)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react_app(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Run the Flask app with a specified port."
    )
    parser.add_argument("--port", type=int, default=50015, help="Port number.")
    args = parser.parse_args()

    app.run(host="0.0.0.0", port=args.port, debug=True)
