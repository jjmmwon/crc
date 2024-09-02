import duckdb


def fetch_sensor_data():
    conn = duckdb.connect("sensor_data.db", read_only=True)
    cursor = conn.execute("SELECT * FROM sensor_data")
    columns = [desc[0] for desc in cursor.description]
    sensor_data = cursor.fetchall()
    conn.close()
    return [dict(zip(columns, row)) for row in sensor_data]
