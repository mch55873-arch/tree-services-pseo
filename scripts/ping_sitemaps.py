import urllib.request
import urllib.parse
import json

# Custom Python script to trigger IndexNow and Search Engine Ping APIs
DOMAIN = "cantreeservice.com"
SITEMAP_URL = f"https://{DOMAIN}/sitemap.xml"

INDEXNOW_KEY = "3a2b1c4d5e6f7a8b9c0d1e2f3a4b5c6d" # IndexNow key hex string
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"

def ping_search_engines():
    print(f"[PING] Pinging Google & Bing with sitemap: {SITEMAP_URL}")
    
    # Ping Google
    google_url = f"https://www.google.com/ping?sitemap={urllib.parse.quote(SITEMAP_URL)}"
    try:
        req = urllib.request.Request(google_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as response:
            print(f"[SUCCESS] Google Ping Status: {response.status}")
    except Exception as e:
        print(f"[NOTE] Google Ping Note: {e}")

    # IndexNow API Payload (Bing, Yandex, Seznam)
    urls_to_ping = [
        f"https://{DOMAIN}/",
        f"https://{DOMAIN}/services/",
        f"https://{DOMAIN}/areas-we-serve/",
        f"https://texas.{DOMAIN}/",
        f"https://california.{DOMAIN}/",
        f"https://florida.{DOMAIN}/"
    ]

    payload = {
        "host": DOMAIN,
        "key": INDEXNOW_KEY,
        "keyLocation": f"https://{DOMAIN}/{INDEXNOW_KEY}.txt",
        "urlList": urls_to_ping
    }

    try:
        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(INDEXNOW_ENDPOINT, data=data, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req) as res:
            print(f"[SUCCESS] IndexNow Protocol Ping Status: {res.status} (Submitted {len(urls_to_ping)} URLs)")
    except Exception as e:
        print(f"[NOTE] IndexNow Ping Note: {e}")

if __name__ == "__main__":
    ping_search_engines()
