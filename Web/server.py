from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# 전역 변수로 큐브 데이터를 저장
send_data = {
    'brightness': 50,
    'scale': 0.4
}

@app.route('/')
def index():
    return send_from_directory(os.getcwd(), 'index.html')

@app.route('/getData', methods=['GET'])
def get_data():
    return jsonify(send_data)

@app.route('/updateData', methods=['POST'])
def update_data():
    data = request.json
    send_data['brightness'] = float(data['brightness'])
    send_data['scale'] = float(data['scale'])
    return jsonify(success=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)