"""
"""
import time
from ahk import AHK


UHD = 3840  # 3840*2160
QHD = 2560  # 2560*144
FHD = 1920  # 1920*1080
HD = 1280  # 1280*720

IMAGE_FOLDER = r"C:\Users\Jungsam\Downloads\images"

IMAGE_SETTINGS = [

]

def set_ahk():
    _ahk = AHK()
    _ahk.set_coord_mode('Mouse', 'Screen')
    return _ahk

def coord(val, current, base):
    width = UHD
    if current == 'UHD':
        width = UHD
    elif current == 'QHD':
        width = QHD
    elif current == 'FHD':
        width = FHD
    elif current == 'HD':
        width = HD
    return int(val*width/base)

def save_image(location=[0, 0], name="FH-01", ahk=None, resolution=UHD):
    # 
    ahk.click(x=coord(location[0], resolution, UHD), y=coord(location[1], resolution, UHD))
    time.sleep(2)
    ahk.send("^{c}")
    time.sleep(1)
    ahk.click(x=coord(916, resolution, UHD), y=coord(2120, resolution, UHD))
    time.sleep(0.5)

    ahk.set_coord_mode('Mouse', 'Window')

    # 메뉴 > 파일
    ahk.click(x=coord(40, resolution, UHD), y=coord(76, resolution, UHD))
    time.sleep(0.1)

    # 새로 만들기
    ahk.click(x=coord(100, resolution, UHD), y=coord(230, resolution, UHD))
    time.sleep(0.1)

    # 새로 만들기2
    ahk.click(x=coord(380, resolution, UHD), y=coord(270, resolution, UHD))
    time.sleep(0.5)

    # 붙여넣기
    ahk.send("^{v}")
    time.sleep(2)

    # 저장하기
    ahk.send("^{s}")
    time.sleep(1)

    # 폴더 경로 입력
    ahk.click(x=coord(1120, resolution, UHD), y=coord(90, resolution, UHD))
    time.sleep(0.2)
    ahk.send(IMAGE_FOLDER)
    time.sleep(0.5)
    ahk.send("{Enter}")
    time.sleep(1)

    # 파일 이름 입력
    ahk.click(x=coord(800, resolution, UHD), y=coord(910, resolution, UHD))
    time.sleep(0.2)
    ahk.send(name)
    time.sleep(0.2)
    ahk.send("{Enter}")
    time.sleep(0.2)

    ahk.set_coord_mode('Mouse', 'Screen')
    ahk.click(x=coord(80, resolution, UHD), y=coord(10, resolution, UHD))
    time.sleep(3)

if __name__ == "__main__":
    ahk = set_ahk()
    for setting in IMAGE_SETTINGS:
        location = [setting[0], setting[1]]
        save_image(location, setting[2], ahk)



