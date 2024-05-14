from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os
import pylnk3 as pylnk

app = FastAPI()

@app.get("/resolve-lnk/{lnk_path:path}")
async def resolve_lnk(lnk_path: str):
    # lnk 파일의 실제 경로를 구합니다.
    try:
        base_path = "C:/JnJ-soft/Projects/external/bw-kmc-app/backend/db/shortcut"
        lnk_full_path = os.path.join(base_path, lnk_path)
        with pylnk.open(lnk_full_path) as lnk:
            target_path = lnk.path
            # 실제 대상 파일이나 폴더로 리다이렉션
            if os.path.exists(target_path):
                return FileResponse(target_path)
            else:
                raise HTTPException(status_code=404, detail="Target file not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 스태틱 파일 마운트
app.mount("/static", StaticFiles(directory="C:/JnJ-soft/Projects/external/bw-kmc-app/backend/db/shortcut"), name="static")
