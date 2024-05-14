"""
네오보감 실행
"""
import time
from ahk import AHK

UHD = 3840  # 3840*2160
QHD = 2560  # 2560*144
FHD = 1920  # 1920*1080
HD = 1280  # 1280*720

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

def open_neobogam(resolution=UHD):
    ahk = AHK()
    ahk.set_coord_mode('Mouse', 'Screen')

    # 네오보감 실행
    ahk.run_script(r'Run C:\Neobogam\NeoHanbang.exe')
    time.sleep(5)

    ahk.send("{Tab}")
    time.sleep(0.5)
    ahk.send("Bigwhite1{!}")
    time.sleep(0.1)
    ahk.send("{Enter}")

    # 팝업 창 닫기(원격접속시 좌표 달라짐)
    time.sleep(5)
    ahk.click(x=coord(2180, resolution, UHD), y=coord(1480, resolution, UHD))
    time.sleep(0.3)
    ahk.click(x=coord(2645, resolution, UHD), y=coord(560, resolution, UHD))
    time.sleep(0.5)

if __name__ == "__main__":
    open_neobogam()

