import os
import pylnk3 as pylnk

def get_shortcut_target(shortcut_path):
    try:
        # pylnk3를 사용하여 .lnk 파일에서 실제 경로를 가져옵니다.
        raw_path = pylnk.parse(shortcut_path).path
        # UTF-8로 시도해보기
        decoded_path = raw_path.encode('utf-8', 'ignore').decode('utf-8')
        return decoded_path
    except Exception as e:
        print(f"Error: {e}")
        return None

    # return pylnk.parse(shortcut_path).path

# 바로가기의 실제 경로: D:\_ЕВ№йЗСАЗїш\Бш·б\Вь°н АЪ·б\ДЎ·б\Д§±ё\images

# def get_shortcut_target(shortcut_path):
#     shortcut = pylnk.Shortcut.from_path(shortcut_path)
#     return shortcut.target


    # with pylnk.Shortcut(shortcut_path, mode='r') as shortcut:
    #     return shortcut.target

# def resolve_lnk(lnk_path):
#     """
#     주어진 .lnk 파일의 실제 경로를 반환합니다.
#     """
#     try:
#         with pylnk.open(lnk_path) as lnk:
#             target = lnk.path
#             if os.path.exists(target):
#                 return target
#             else:
#                 print("바로가기가 가리키는 경로가 존재하지 않습니다.")
#     except Exception as e:
#         print(f"바로가기 파일을 처리하는 중 오류가 발생했습니다: {e}")

# .lnk 파일 경로
lnk_file_path = r'C:\JnJ-soft\Projects\external\bw-kmc-app\backend\db\shortcut\neobogam.lnk'
# lnk_file_path = r'C:\JnJ-soft\Projects\external\bw-kmc-app\backend\db\shortcut\acuimages.lnk'

# 바로가기 실제 경로를 구해보기
real_path = get_shortcut_target(lnk_file_path)
print(f"바로가기의 실제 경로: {real_path}")
# if real_path:
#     print(f"바로가기의 실제 경로: {real_path}")
