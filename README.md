# CRC

1. `SensorPoller.py`에서 `IP`주소 수정
2. `server/app.py`의 `port`와 `interface/vite.config.ts`의 `port` (`"/api":{target: "http://localhost:{port number}"}`)가 일치하는지 확인

# 코드 실행 방법
1. `sensor data poller` 실행
root: `server`
실행: `python SensorPoller.py`

2. 서버 실행
root: `server`
실행: `python app.py`

3. 인터페이스 실행
root: `interface`
실행: `pnpm run dev`

