import json
import os
import urllib.request
import time

# Custom Python Script: Xagio-Style Tier-1 LinkSheets & PBN Backlink Generator
TARGET_SITES = [
    {
        "domain": "cantreeservice.com",
        "niche": "Tree Service & Arborist Care",
        "anchors": ["Emergency Tree Removal", "Certified Arborist Near Me", "Tree Trimming & Pruning", "Stump Grinding Service"]
    },
    {
        "domain": "garagedoorgazette.com",
        "niche": "Garage Door Repair & Installation",
        "anchors": ["Emergency Garage Door Repair", "Garage Door Spring Replacement", "Garage Door Opener Repair", "Commercial Overhead Door"]
    },
    {
        "domain": "batyspestcontrol.com",
        "niche": "Pest Control & Termite Extermination",
        "anchors": ["Local Pest Control Service", "Termite Exterminator Near Me", "Emergency Bed Bug Treatment", "Rodent Control Solutions"]
    },
    {
        "domain": "villageplumbers.co.nz",
        "niche": "Emergency Plumbing & Drain Unblocking",
        "anchors": ["Emergency Plumber NZ", "Blocked Drain Unblocking", "Hot Water Cylinder Repair", "Gas Leak Detection NZ"]
    }
]

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")

def build_linksheet_package():
    print("============================================================")
    print("[START] BUILDING XAGIO-STYLE TIER-1 LINKSHEETS & BACKLINKS")
    print("============================================================")
    
    os.makedirs(DATA_DIR, exist_ok=True)
    
    linksheet_html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>High Authority Tier-1 pSEO Citation & Backlink Index</title>
    <style>
        body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 40px; line-height: 1.6; }
        .card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 24px; margin-bottom: 24px; }
        h2 { color: #38bdf8; margin-top: 0; }
        ul { list-style: none; padding: 0; }
        li { margin-bottom: 8px; }
        a { color: #34d399; text-decoration: none; font-weight: bold; }
        a:hover { text-decoration: underline; color: #6ee7b7; }
    </style>
</head>
<body>
    <h1>🔗 High-Authority Tier-1 pSEO Backlink Directory Index</h1>
    <p>Automated contextual backlinks and citation authority hubs for nationwide service brands.</p>
"""

    for site in TARGET_SITES:
        domain = site["domain"]
        niche = site["niche"]
        linksheet_html += f"""
    <div class="card">
        <h2>🌐 {domain} — {niche}</h2>
        <ul>
"""
        for anchor in site["anchors"]:
            slug = anchor.lower().replace(" ", "-")
            url = f"https://{domain}/#{slug}"
            linksheet_html += f'            <li>• <a href="{url}" target="_blank">{anchor}</a> — <i>Official {niche} Network</i></li>\n'
        
        linksheet_html += """        </ul>
    </div>
"""

    linksheet_html += """
</body>
</html>
"""

    linksheet_path = os.path.join(DATA_DIR, "tier1_linksheets.html")
    with open(linksheet_path, "w", encoding="utf-8") as f:
        f.write(linksheet_html)

    print(f"[SUCCESS] Created Tier-1 LinkSheets HTML at: {linksheet_path}")

    # Build PBN Backlink JSON Package
    pbn_package = {
        "strategy": "Xagio Tier-1 LinkSheets & PBN Backlink Syndication",
        "sites": TARGET_SITES,
        "linksheet_url": linksheet_path
    }
    
    pbn_json_path = os.path.join(DATA_DIR, "pbn_backlinks_package.json")
    with open(pbn_json_path, "w", encoding="utf-8") as f:
        json.dump(pbn_package, f, indent=2)

    print(f"[SUCCESS] Created PBN Backlinks JSON at: {pbn_json_path}")
    print("============================================================")

if __name__ == "__main__":
    build_linksheet_package()
