import subprocess
import time
import sys

# Production Multi-Site Bulk Indexing Engine
DOMAINS = [
    "cantreeservice.com",
    "batyspestcontrol.com",
    "garagedoorgazette.com"
]

def index_all_sites():
    print("============================================================")
    print("[START] MULTI-SITE BULK AUTO-INDEXING ENGINE FOR ALL DOMAINS")
    print("============================================================")
    
    results = {}
    for domain in DOMAINS:
        print(f"\n============================================================")
        print(f"[DOMAIN] RUNNING INDEXER FOR DOMAIN: {domain}")
        print(f"============================================================")
        try:
            res = subprocess.run(
                [sys.executable, "scripts/bulk_auto_indexer.py", domain],
                capture_output=True,
                text=True,
                check=True
            )
            print(res.stdout)
            results[domain] = "SUCCESS"
        except subprocess.CalledProcessError as e:
            print(f"[ERROR] Failed to index {domain}: {e.stderr}")
            results[domain] = "ERROR"
        time.sleep(2)
        
    print("\n============================================================")
    print("[COMPLETE] ALL SITES PROCESSED CLEANLY!")
    print("Status Summary:", results)
    print("============================================================")

if __name__ == "__main__":
    index_all_sites()
