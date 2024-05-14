# -*- coding: utf-8 -*-
import os
from pathlib import Path
import re  # For regex(regular expression)
import json  # For json data/file
import configparser  # For .ini file


# ? String(search/replace/regex)
# ?-----------------------------------------------------------------------------
def replace_re(maps={}, s=""):
    # """Replace by Regex
    # :param maps: (dict, {}) 치환 패턴 목록  예) {r'\s*\n+\s*': ';', r';{2,}': ';'}
    # :param s: (str, "") 치환 대상 문자열

    # :return: 치환후 문자열
    # :usages: replace_re(maps={r'\s*\n+\s*': ';', r';{2,}': ';'}, s=" \n\n abc;;;def")
    #   =>
    # """
    for key, val in maps.items():
        s = re.sub(key, val, s)
    return s


def replace(maps, s):
    # """문자열 치환
    # _str: 대상 문자열
    # _rep: 치환 규칙 dictionary {'A': 'a', 'r_(\d+)', '\1-'} / list [('A', 'a'), ('r_(\d+)', '\1-'), ...]
    # """

    def _replace(p, r, s):
        (p, p_re) = (p[2:] if p[:2] == "r_" else p, p[:2] == "r_")
        return re.sub(p, r, s) if p_re else s.replace(p, r)

    if type(maps) == dict:
        for p, r in maps.items():
            s = _replace(p, r, s)
    else:
        for p, r in maps:
            s = _replace(p, r, s)

    return s


def _insert_join(patterns=[], replacements=[], content=""):
    """
    content(문자열)에 포함된 patterns들을 replacements로 대체(replace(X) insert and join)
    NOTE: 속도(성능) 차이 분석
    content = "abcdefghijklmnopqrstuvwxyz"*10000
    patterns=['d', 'j', 'm', 'x']
    replacements=['D', 'J', 'M', 'X']
        insert_join time : 0.0003902912139892578
        replace time : 0.0005877017974853516
    """
    if len(patterns) == len(replacements):
        splits = []
        for pattern in patterns:
            (piece, content) = content.split(pattern, 1)
            splits.append(piece)
        splits.append(content)
    else:
        return None

    result = splits[0]
    for i, repl in enumerate(replacements):
        result = repl.join([result, splits[i + 1]])

    return result


def digit(s=""):
    """Convert String to Number(Remove char except digit(number, '.', ','))
    - s(str, ''): 추출 대상 문자열  예) "100,500.5원"
    """
    s = re.sub(r"[^\d.\-]", "", s)
    s = "0" if s == "" else s
    return float(s) if "." in s else int(s)


# ? Functions For File
# ?-----------------------------------------------------------------------------
# def mkdir(_path):
#     """Make Dir"""
#     Path(_path).mkdir(parents=True, exist_ok=True)

def slashed_folder(folder):
    folder = folder.replace('\\', '/')
    return folder if not folder.endswith('/') else folder[:-1]

def mkdir(_path):
    _path = _path.replace('\\', '/')
    _path = f"./{_path}" if not ":" in _path and not _path.startswith(".") else _path
    directory = os.path.dirname(_path)
    if not os.path.exists(directory):
        os.makedirs(directory)

# base_path의 하위 폴더 중에 이름에 pattern을 포함하는 폴더
def find_folders(base_path, pattern):
    matched_folders = []
    # base_path 디렉토리 내의 모든 파일과 폴더를 순회합니다.
    for entry in os.listdir(base_path):
        full_path = os.path.join(base_path, entry)
        # 현재 엔트리가 폴더이고, 패턴을 포함한다면 리스트에 추가합니다.
        if os.path.isdir(full_path) and pattern in entry:
            matched_folders.append(full_path)

    return matched_folders

# def find_files(directory, ext='.html'):
#     html_files = []
#     for root, dirs, files in os.walk(directory):
#         for file in files:
#             if file.endswith(ext):
#                 html_files.append(os.path.join(root, file))
#     return html_files


# def find_files(directory, pattern='*.html'):
def find_files(directory, pattern='*'):
    return [slashed_folder(str(file)) for file in Path(directory).rglob(pattern)]

# # * 
# def _set_name(name):
#     return re.sub(r'[\<\>:"|?*]', NAME_CHAR, name).replace("/", NAME_CHAR2).replace("\t", NAME_CHAR).strip()


# def sanitize_filename(filename, to="-"):
#     # Windows에서 사용할 수 없는 문자를 대체합니다.
#     sanitized = re.sub(r'[\<\>:"/|?*]', to, filename)
    
#     # # Windows에서 사용할 수 없는 파일 이름을 대체합니다.
#     # reserved_names = ["CON", "PRN", "AUX", "NUL", 
#     #                   "COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9", 
#     #                   "LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", "LPT9"]
    
#     # 파일 이름의 확장자를 제외한 기본 이름을 추출합니다.
#     base_name = os.path.splitext(sanitized)[0]

#     if base_name.upper() in reserved_names:
#         sanitized = "-" + sanitized

#     return sanitized


def load_file(_path, encoding="utf-8"):
    """Load File(Read File)"""
    with open(_path, "r", encoding=encoding) as f:
        return f.read()

def save_file(_path, data, mode="w", encoding="utf-8"):
    mkdir(_path)
    if "b" in mode:
        with open(_path, mode) as file:
            file.write(data)
    else:
        with open(_path, mode, encoding=encoding) as file:
            file.write(data)


def load_json(_path, encoding="utf-8"):
    """Load Json File(Read Json File)"""
    with open(_path, "r", encoding=encoding) as f:
        return json.load(f)


def save_json(_path, data, encoding="utf-8"):
    mkdir(_path)
    """Save Data to Json File"""
    json.dump(data, open(_path, "w", encoding=encoding), ensure_ascii=False, indent="\t")


def load_ini(_path):
    """Load Ini File(Read Ini File)"""
    config = configparser.ConfigParser()
    config.read(_path, encoding="utf-8")
    return config


# & TODO: check
def save_ini(_path, data):
    mkdir(_path)
    """Save Data to Ini File"""
    config = configparser.ConfigParser()
    config = data
    # 설정파일 저장
    with open(_path, "w", encoding="utf-8") as f:
        config.write(f)


# def config_generator():
#     # 설정파일 만들기
#     config = configparser.ConfigParser()

#     # 설정파일 오브젝트 만들기
#     config["system"] = {}
#     config["system"]["title"] = "Neural Networks"
#     config["system"]["version"] = "1.2.42"
#     config["system"]["update"] = strftime("%Y-%m-%d %H:%M:%S")

#     config["video"] = {}
#     config["video"]["width"] = "640"
#     config["video"]["height"] = "480"
#     config["video"]["type"] = "avi"

#     # 설정파일 저장
#     with open("config.ini", "w", encoding="utf-8") as configfile:
#         config.write(configfile)


# def rename_file(folder_path):
#     # 폴더 내의 모든 파일에 대해 반복
#     for filename in os.listdir(folder_path):
#         # 파일 이름이 "aa_"로 시작하는 경우
#         if filename.startswith("제목+내용-다한증_"):
#             # "aa_"를 "bb_"로 변경
#             new_filename = filename.replace("제목+내용-다한증_", "")
            
#             # 원본 파일의 전체 경로
#             old_file = os.path.join(folder_path, filename)
            
#             # 새 파일의 전체 경로
#             new_file = os.path.join(folder_path, new_filename)
            
#             # 파일 이름 변경
#             os.rename(old_file, new_file)
#             print(f"Renamed '{old_file}' to '{new_file}'")