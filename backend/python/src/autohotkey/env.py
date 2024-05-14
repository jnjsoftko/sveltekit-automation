from dotenv import load_dotenv
import os 

# load .env
load_dotenv()

EXCEL_PATIENTS_PATH = os.environ.get('EXCEL_PATIENTS_PATH', '').replace("\\", "/")
splits = EXCEL_PATIENTS_PATH.split("/")
[EXCEL_PATIENTS_FOLDER, EXCEL_PATIENTS_FILE] = ["\\".join(splits[:-1]), splits[-1]]

print(f"{EXCEL_PATIENTS_FOLDER=}, {EXCEL_PATIENTS_FILE=}")

# EXCEL_PATIENTS_PATH='C:/JnJ-soft/Projects/external/bw-kmc-app/backend/db/excel/patients_all.xls'