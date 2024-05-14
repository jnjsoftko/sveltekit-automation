@REM 한글 명령어 에러 제거
chcp 65001

:: .env 파일 위치 설정
set ENV_FILE=..\.env

:: 불러올 환경 변수 목록 설정
set "VARIABLES=VITE_POCKETBASE_SERVE_HTTP VITE_POCKETBASE_SERVE_DIR"

:: .env 파일에서 유효한 설정만 읽어 환경 변수로 설정
for /f "tokens=1* delims==" %%i in (%ENV_FILE%) do (
    for %%v in (%VARIABLES%) do (
        if "%%i"=="%%v" (
            set "%%i=%%~j"
        )
    )
)

@REM RUN POCKETBASE SERVER
start pocketbase serve --dir="%VITE_POCKETBASE_SERVE_DIR%" --http="%VITE_POCKETBASE_SERVE_HTTP%"
@REM pocketbase serve --dir="C:/JnJ-soft/Developments/_Templates/pocketbase/auth/sqlite" --http="127.0.0.1:8090"

@REM RUN APP SERVER / APP_ROOT_DIR: 환경변수 설정 필요
cd %APP_ROOT_DIR%\frontend
start npm run dev
timeout /t 1

@REM RUN GRAPHQL SERVER
cd %APP_ROOT_DIR%/backend/nodejs/src/graphql
start node --watch index.js