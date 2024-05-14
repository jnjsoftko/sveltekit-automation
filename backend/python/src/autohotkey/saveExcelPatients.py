"""
네오보감 환자 목록 엑셀 저장
python C:\JnJ-soft\Playground\bw-kmc-python\src\autohotkey\saveExcelPatients.py --resolution=QHD
"""
import time
from ahk import AHK
import argparse
from dotenv import load_dotenv
import os 

# load .env(C:\JnJ-soft\Projects\external\bw-kmc-app)
load_dotenv()

PATIENTS_NEO_EXCEL_PATH = os.environ.get('PATIENTS_NEO_EXCEL_PATH', '').replace("\\", "/")
splits = PATIENTS_NEO_EXCEL_PATH.split("/")
[PATIENTS_FOLDER, PATIENTS_FILE] = ["\\".join(splits[:-1]), splits[-1]]


UHD = 3840  # 3840*2160
QHD = 2560  # 2560*144
FHD = 1920  # 1920*1080
HD = 1280  # 1280*720

# argparse를 사용하여 커맨드 라인 인자 파싱
parser = argparse.ArgumentParser(description='Save neobogam patient list to EXCEL')
parser.add_argument('--resolution', default='UHD', help='resolution')
args = parser.parse_args()

def set_ahk():
    _ahk = AHK()
    _ahk.set_coord_mode('Mouse', 'Screen')
    return _ahk

def coord(val, current, base):
    if current == 'UHD':
        width = UHD
    elif current == 'QHD':
        width = QHD
    elif current == 'FHD':
        width = FHD
    elif current == 'HD':
        width = HD
    return int(val*width/base)

def save_excel_patients(resolution=UHD, ahk=None):
    print(f"{ahk=}")
    if not ahk:
        ahk = set_ahk()

    # 메뉴 클릭(네오보감(focusing click) > 통계 관리 > 환자 인적 조회)
    ahk.click(x=coord(570, resolution, UHD), y=coord(30, resolution, UHD))
    time.sleep(0.5)
    ahk.click(x=coord(380, resolution, UHD), y=coord(60, resolution, UHD))
    time.sleep(0.5)
    ahk.click(x=coord(380, resolution, UHD), y=coord(200, resolution, UHD))
    time.sleep(0.5)

    # 조회/출력 클릭
    ahk.click(x=coord(3630, resolution, UHD), y=coord(80, resolution, UHD))
    time.sleep(15)

    ahk.click(x=coord(3500, resolution, UHD), y=coord(80, resolution, UHD))
    time.sleep(10)

    # 엑셀/저장 클릭(좌표값 재계산 필요, 팝업이 화면 중앙에 뜸)
    ahk.click(x=coord(920, resolution, UHD), y=coord(170, resolution, UHD))
    time.sleep(5)

    ahk.click(x=coord(1500, resolution, UHD), y=coord(190, resolution, UHD))
    time.sleep(1)
    ahk.send("{Enter}")
    time.sleep(0.1)
    ahk.send(PATIENTS_FOLDER)
    time.sleep(0.1)
    ahk.send("{Enter}")
    time.sleep(0.5)

    ahk.click(x=coord(430, resolution, UHD), y=coord(1030, resolution, UHD))
    time.sleep(0.1)
    ahk.send("{Enter}")
    time.sleep(0.1)
    ahk.send(PATIENTS_FILE)
    time.sleep(0.1)

    ahk.send("!{s}")
    time.sleep(0.1)
    ahk.send("!{n}")
    time.sleep(0.1)

    # 출력/조회창 닫기 클릭(좌표값 재계산 필요, 팝업이 화면 중앙에 뜸)
    ahk.click(x=coord(1090, resolution, UHD), y=coord(170, resolution, UHD))
    time.sleep(0.1)

    ahk.click(x=coord(3780, resolution, UHD), y=coord(80, resolution, UHD))
    time.sleep(0.1)

    # 진료실 열기 클릭(좌표값 재계산 필요, 팝업이 화면 중앙에 뜸)
    ahk.click(x=coord(200, resolution, UHD), y=coord(120, resolution, UHD))
    time.sleep(0.1)

def open_chrome(ahk, resolution=UHD):
    if not ahk:
        ahk = set_ahk()

    # 크롬(진료웹앱) 열기 클릭
    ahk.click(x=coord(720, resolution, UHD), y=coord(2120, resolution, UHD))
    time.sleep(0.1)

if __name__ == "__main__":
    save_excel_patients(args.resolution)

