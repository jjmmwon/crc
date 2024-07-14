from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# 전역 변수로 큐브 데이터를 저장
cube_data = {
    'brightness': 50
}

@app.route('/')
def index():
    return send_from_directory(os.getcwd(), 'index.html')

@app.route('/getCubeData', methods=['GET'])
def get_cube_data():
    return jsonify(cube_data)

@app.route('/updateCubeData', methods=['POST'])
def update_cube_data():
    data = request.json
    cube_data['brightness'] = float(data['brightness'])
    return jsonify(success=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)