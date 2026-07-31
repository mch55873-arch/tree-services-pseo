import urllib.request
import re

url = 'https://expert-plumbing-services-pros.pages.dev/'

req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    res = urllib.request.urlopen(req, timeout=10)
    html = res.read().decode('utf-8', errors='ignore')
    print(f'[OK {res.status}] {url} | Size: {len(html):,} bytes')

    title = re.search(r'<title>(.*?)</title>', html, re.I)
    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.I | re.S)
    print('Title:', title.group(1) if title else 'None')
    print('H1:', h1.group(1).strip() if h1 else 'None')

    phones = re.findall(r'tel:([^\"]+)', html)
    print('Phone numbers:', set(phones))

    schemas = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S)
    print(f'JSON-LD Schemas found: {len(schemas)}')

    clean_text = re.sub(r'<[^>]+>', ' ', html)
    clean_text = re.sub(r'\s+', ' ', clean_text).strip()
    print('\nSnippet of Page Content:')
    print(clean_text[:600])

except Exception as e:
    print(f'[FAIL {e}] {url}')
