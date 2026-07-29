import csv
import json
import urllib.request
import time
import os

CSV_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "gsc_export", "Table.csv")
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"
INDEXNOW_KEY = "3a2b1c4d5e6f7a8b9c0d1e2f3a4b5c6d"
DOMAIN = "villageplumbers.co.nz"

def ping_discovered_urls():
    print("============================================================")
    print("[START] PINGING DISCOVERED GSC URLs VIA INDEXNOW ENGINE")
    print("============================================================")
    
    if not os.path.exists(CSV_PATH):
        print(f"[ERROR] CSV not found at {CSV_PATH}")
        return

    urls = []
    with open(CSV_PATH, "r", encoding="utf-8", errors="ignore") as f:
        reader = csv.reader(f)
        header = next(reader, None)
        for row in reader:
            if row and len(row) > 0 and row[0].startswith("http"):
                urls.append(row[0].strip())

    urls = list(dict.fromkeys(urls))
    print(f"[OK] Extracted {len(urls):,} Unique Discovered URLs from GSC Export!")

    BATCH_SIZE = 500
    batches = [urls[i:i + BATCH_SIZE] for i in range(0, len(urls), BATCH_SIZE)]

    for idx, batch in enumerate(batches, start=1):
        print(f"\n--- Submitting Batch {idx}/{len(batches)} ({len(batch)} URLs) ---")
        payload = {
            "host": DOMAIN,
            "key": INDEXNOW_KEY,
            "keyLocation": f"https://{DOMAIN}/{INDEXNOW_KEY}.txt",
            "urlList": batch
        }
        try:
            data = json.dumps(payload).encode('utf-8')
            req = urllib.request.Request(
                INDEXNOW_ENDPOINT,
                data=data,
                headers={"Content-Type": "application/json; charset=utf-8"}
            )
            with urllib.request.urlopen(req) as res:
                print(f"[SUCCESS] IndexNow Response Code: {res.status} (Accepted {len(batch)} URLs)")
        except Exception as e:
            print(f"[ERROR] IndexNow Ping Failed: {e}")
        time.sleep(1)

    print("\n============================================================")
    print(f"[COMPLETE] PINGED {len(urls):,} GSC DISCOVERED URLs TO INDEXNOW!")
    print("============================================================")

if __name__ == "__main__":
    ping_discovered_urls()
