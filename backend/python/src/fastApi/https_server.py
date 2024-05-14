# python src/fastApi/https_server.py --port=4002
# https://192.168.0.42:4002/neobogam/diagpic/N001564문정삼240402_3.JPG
# https://192.168.0.42:4002/oldCharts/수기차트_2019_2023/0001_석영애/Scan_20231205_150527.jpg
# https://192.168.0.42:4002/oldCharts/치험례(처방)_2022-2023/texts/0202_이상만_2.txt

import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import argparse
import os

# argparse를 사용하여 커맨드 라인 인자 파싱
parser = argparse.ArgumentParser(description='Start HTTPS server with FastAPI.')
# parser.add_argument('--dir', default='.', help='Directory to serve')
parser.add_argument('--port', type=int, default=9999, help='Port to serve on')
args = parser.parse_args()

# FastAPI 앱 생성
app = FastAPI()

# 지정된 디렉토리를 static 폴더로 서빙
app.mount("/neobogam", StaticFiles(directory="C:/neoimage"), name="static")
app.mount("/oldCharts", StaticFiles(directory=r"D:\_태백한의원\진료\진료 기록"), name="oldCharts")
app.mount("/acuImages", StaticFiles(directory=r"D:\_태백한의원\진료\참고 자료\치료\침구\images"), name="acuImages")

@app.get("/")
async def read_root():
    return {"message": "FastAPI HTTPS server is running."}

# @app.get("/files/{file_path:path}")
# async def read_file(file_path: str):
#     file_location = os.path.join(args.dir, file_path)
#     if os.path.exists(file_location):
#         return FileResponse(file_location)
#     return {"message": "File not found."}

# 서버 실행을 위한 함수
def run():
    DEV_SETTINGS = os.environ['DEV_SETTINGS']
    uvicorn.run("https_server:app", 
                host="0.0.0.0", 
                port=args.port, 
                ssl_keyfile=f'{DEV_SETTINGS}\\mkcert\\localhost+2-key.pem', 
                ssl_certfile=f'{DEV_SETTINGS}\\mkcert\\localhost+2.pem')

if __name__ == "__main__":
    run()