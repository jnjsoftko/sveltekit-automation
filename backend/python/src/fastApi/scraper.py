# conda activate automation
# python scraper.py
# http://127.0.0.1:8899/requests?url=https://example.com

from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import requests
from typing import Optional
from bs4 import BeautifulSoup

import os, sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))
from _utils.base_builtin import save_file, load_file


app = FastAPI()

@app.get("/requests")
async def scraper_requests(url: str, out: Optional[str] = None, path: Optional[str] = None):
    """
    out: text | html | md | json
    path: save file path
    """
    try:
        response = requests.get(url)
        response.raise_for_status()  # 오류가 있을 경우 예외를 발생시킵니다.
        out = "text"  if not out else out.lower()
        data = ""

        if (out == "html"):
            data = BeautifulSoup(response.text, 'html.parser').prettify()
        elif (out == "text"):
            data = BeautifulSoup(response.text, 'html.parser').get_text()
        if path:
            save_file(path, data)

        return JSONResponse(content={"data": data})
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8899)
