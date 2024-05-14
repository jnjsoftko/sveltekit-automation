import yaml
# from time import strftime


def load_yaml(_path):
    return yaml.load(open(_path, "r", encoding="UTF-8"), Loader=yaml.FullLoader)