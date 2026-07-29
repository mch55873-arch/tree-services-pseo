import zipfile
import xml.etree.ElementTree as ET
import os

XLSX_PATH = r"C:\Users\HP\Downloads\garagedoorgazette.com-Coverage-Drilldown-2026-07-28.xlsx"

def parse_xlsx():
    print(f"[XLSX] Extracting GSC Excel file for GarageDoorGazette: {XLSX_PATH}")
    if not os.path.exists(XLSX_PATH):
        print(f"[ERROR] Excel file not found at {XLSX_PATH}")
        return

    try:
        with zipfile.ZipFile(XLSX_PATH, 'r') as z:
            print(f"[OK] XLSX archive files: {z.namelist()[:10]}")
            
            # Read sharedStrings.xml
            shared_strings = []
            if "xl/sharedStrings.xml" in z.namelist():
                xml_str = z.read("xl/sharedStrings.xml")
                root = ET.fromstring(xml_str)
                for elem in root.iter():
                    if elem.tag.endswith("t") and elem.text:
                        shared_strings.append(elem.text.strip())
                        
            print(f"[SUCCESS] Extracted {len(shared_strings)} shared strings.")
            print("First 20 strings extracted:")
            for s in shared_strings[:20]:
                print("  -", s)
    except Exception as e:
        print(f"[ERROR] Failed to parse XLSX: {e}")

if __name__ == "__main__":
    parse_xlsx()
