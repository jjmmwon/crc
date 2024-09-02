import sqlite3


def fetch_sensor_data():
    # Read-only 모드로 SQLite 데이터베이스 연결
    conn = sqlite3.connect("sensor_data.db")
    cursor = conn.cursor()

    # 데이터 선택 쿼리 실행
    cursor.execute("SELECT * FROM sensor_data")

    # 열 이름 가져오기
    columns = [desc[0] for desc in cursor.description]

    # 데이터 페칭
    sensor_data = cursor.fetchall()

    # 연결 닫기
    conn.close()

    # 결과를 딕셔너리 형태로 반환
    return [dict(zip(columns, row)) for row in sensor_data]
