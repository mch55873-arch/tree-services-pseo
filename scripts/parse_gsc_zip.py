import zipfile
import os
import csv

ZIP_PATH = r"C:\Users\HP\Downloads\villageplumbers.co.nz-Coverage-Drilldown-2026-07-28.zip"
EXTRACT_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "gsc_export")

def parse_gsc_report():
    print(f"[ZIP] Extracting GSC Coverage Zip: {ZIP_PATH}")
    if not os.path.exists(ZIP_PATH):
        print(f"[ERROR] Zip file not found at {ZIP_PATH}")
        return

    os.makedirs(EXTRACT_DIR, exist_ok=True)
    with zipfile.ZipFile(ZIP_PATH, 'r') as zip_ref:
        zip_ref.extractall(EXTRACT_DIR)
        files = zip_ref.namelist()
        print(f"[SUCCESS] Extracted {len(files)} files: {files}")

    for fname in files:
        if fname.endswith(".csv"):
            fpath = os.path.join(EXTRACT_DIR, fname)
            print(f"\n--- Reading CSV: {fname} ---")
            with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
                reader = csv.reader(f)
                rows = list(reader)
                print(f"Total Rows: {len(rows)}")
                print("Header:", rows[0] if rows else [])
                print("First 5 Sample URLs:")
                for r in rows[1:6]:
                    print("  -", r)

if __name__ == "__main__":
    parse_gsc_report()
