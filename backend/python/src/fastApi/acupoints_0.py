# uvicorn main:app --reload

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List
from PIL import Image, ImageDraw

app = FastAPI()

# 이 부분에서 혈자리 데이터베이스를 불러오거나 정의해야 합니다.
acupoints = {
    "합곡": (100, 200),  # 예시 좌표
    "곡지": (150, 300),
    "족삼리": (200, 400)
}

class AcupointRequest(BaseModel):
    acupoints: List[str]

@app.post("/mark-acupoints/")
async def mark_acupoints(request: AcupointRequest):
    image = Image.open(r'C:\JnJ-soft\Projects\external\bw-kmc-app\backend\python\images\body_01.jpg')
    draw = ImageDraw.Draw(image)
    
    for point in request.acupoints:
        if point in acupoints:
            x, y = acupoints[point]
            draw.ellipse([(x-10, y-10), (x+10, y+10)], outline='red', width=3)
        else:
            raise HTTPException(status_code=404, detail=f"Acupoint '{point}' not found")
    
    output_path = 'output.jpg'
    image.save(output_path)
    return FileResponse(output_path, media_type='image/jpeg')

