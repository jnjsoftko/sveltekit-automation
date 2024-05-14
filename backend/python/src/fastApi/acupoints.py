# python src/fastApi/acupoints.py --port=4006
# D:\_태백한의원\진료\참고 자료\_temp\_scan\01\#침구

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List
from PIL import Image, ImageDraw, ImageFont
import argparse
import os

# argparse를 사용하여 커맨드 라인 인자 파싱
parser = argparse.ArgumentParser(description='Start HTTPS server with FastAPI.')
# parser.add_argument('--dir', default='.', help='Directory to serve')
parser.add_argument('--port', type=int, default=4006, help='Port to serve on')
args = parser.parse_args()

# FastAPI 앱 생성
app = FastAPI()

# 이 부분에서 혈자리 데이터베이스를 불러오거나 정의해야 합니다.
acupoints = {
    "합곡": [918, 528],  # 예시 좌표
    "곡지": [1344, 919],
    "족삼리": [1404, 913]
}

class AcupointRequest(BaseModel):
    acupoints: List[str]

@app.post("/mark-acupoints/")
async def mark_acupoints(request: AcupointRequest):
    print(f"{request.acupoints=}")
    image = Image.open(r'C:\JnJ-soft\Projects\external\bw-kmc-app\backend\python\images\VisualAcupuncture_01.PNG')
    draw = ImageDraw.Draw(image)
    # 사용할 한글 폰트 지정
    font_path = 'NanumGothic.ttf'
    font = ImageFont.truetype(font_path, size=20)

    for point in request.acupoints:
        if point in acupoints:
            x, y = acupoints[point]
            draw.ellipse([(x-10, y-10), (x+10, y+10)], outline='red', width=3)
            draw.text((x+15, y-10), point, fill='blue', font=font)
        else:
            raise HTTPException(status_code=404, detail=f"Acupoint '{point}' not found")
    
    
    output_path = 'output.jpg'
    image.save(output_path)
    return FileResponse(output_path, media_type='image/jpeg')

# 서버 실행을 위한 함수
def run():
    DEV_SETTINGS = os.environ['DEV_SETTINGS']
    uvicorn.run("acupoints:app", 
                host="0.0.0.0", 
                port=args.port, 
                ssl_keyfile=f'{DEV_SETTINGS}\\mkcert\\localhost+2-key.pem', 
                ssl_certfile=f'{DEV_SETTINGS}\\mkcert\\localhost+2.pem')

if __name__ == "__main__":
    run()