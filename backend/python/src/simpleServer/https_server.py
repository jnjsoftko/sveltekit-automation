# 사용법: python https_server.py --dir="D:\_태백한의원\진료\진료 기록" --port=9999

import argparse
from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl
import os

# argparse를 사용하여 커맨드 라인 인자 파싱
parser = argparse.ArgumentParser(description='Start HTTPS server.')
parser.add_argument('--dir', default='.', help='Directory to serve')
parser.add_argument('--port', type=int, default=9999, help='Port to serve on')
args = parser.parse_args()

# 사용자가 지정한 디렉토리로 작업 디렉토리 변경
os.chdir(args.dir)

# 서버 설정
server_address = ('', args.port)

# HTTPServer 생성
httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)

DEV_SETTINGS = os.environ['DEV_SETTINGS']

# SSL 설정
httpd.socket = ssl.wrap_socket(
    httpd.socket,
    server_side=True,
    certfile=f'{DEV_SETTINGS}\\mkcert\\localhost+2.pem', # 인증서 파일 경로 변경 필요
    keyfile=f'{DEV_SETTINGS}\\mkcert\\localhost+2-key.pem', # 개인 키 파일 경로 변경 필요
    ssl_version=ssl.PROTOCOL_TLS
)

# 서버 실행
print(f'HTTPS Server running on port {args.port} and serving directory {args.dir}...')
httpd.serve_forever()
