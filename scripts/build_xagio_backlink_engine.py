import json
import os
import datetime

# Custom Python Automation: Xagio-Style 3-Tier Backlink & LinkSheet Engine
DOMAINS = [
    {
        "domain": "cantreeservice.com",
        "name": "Can Tree Service",
        "niche": "Tree Service & Arborist Care",
        "anchors": ["Emergency Tree Removal", "Certified Arborist", "Tree Trimming & Pruning", "Stump Grinding Service"]
    },
    {
        "domain": "garagedoorgazette.com",
        "name": "Garage Door Gazette",
        "niche": "Garage Door Repair & Installation",
        "anchors": ["Emergency Garage Door Repair", "Garage Door Spring Replacement", "Garage Door Opener Installation", "Commercial Overhead Door Repair"]
    },
    {
        "domain": "batyspestcontrol.com",
        "name": "Baty's Pest Control",
        "niche": "Pest Control & Termite Extermination",
        "anchors": ["Local Pest Control Service", "Termite Exterminator Near Me", "Emergency Bed Bug Treatment", "Rodent Control Solutions"]
    },
    {
        "domain": "villageplumbers.co.nz",
        "name": "Village Plumbers NZ",
        "niche": "Emergency Plumbing & Drain Unblocking",
        "anchors": ["Emergency Plumber NZ", "Blocked Drain Unblocking", "Hot Water Cylinder Repair", "Gas Leak Detection NZ"]
    }
]

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")

def build_xagio_engine():
    print("============================================================")
    print("[START] BUILDING XAGIO 3-TIER BACKLINK & LINKSHEET SUITE")
    print("============================================================")
    
    os.makedirs(DATA_DIR, exist_ok=True)
    
    # 1. Generate GitHub & Web 2.0 Ready Markdown Backlink Posts
    for site in DOMAINS:
        domain = site["domain"]
        name = site["name"]
        niche = site["niche"]
        
        md_content = f"# {name} — Official {niche} Network Authority Hub\n\n"
        md_content += f"Welcome to the official digital lease asset directory for **{name}**. We provide 24/7 nationwide coverage across the United States and New Zealand.\n\n"
        md_content += "## Core Service Anchors & Directory Links:\n\n"
        
        for anchor in site["anchors"]:
            slug = anchor.lower().replace(" ", "-")
            md_content += f"- [{anchor}](https://{domain}/#{slug}) — 24/7 Professional {niche} Solutions\n"
            
        md_content += f"\n\n*Verified Authority LinkSheet generated on {datetime.date.today()} for {domain}*\n"
        
        md_path = os.path.join(DATA_DIR, f"web20_backlink_{domain.replace('.', '_')}.md")
        with open(md_path, "w", encoding="utf-8") as f:
            f.write(md_content)
        print(f"[OK] Generated Web 2.0 Article: {md_path}")

    # 2. Build RSS Feed Syndication XML
    rss_content = f"""<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Xagio pSEO Tier-1 Backlink Syndication Feed</title>
  <link>https://cantreeservice.com/</link>
  <description>Automated backlink syndication feed for nationwide pSEO brands.</description>
  <lastBuildDate>{datetime.datetime.utcnow().strftime('%a, %d %b %Y %H:%M:%S GMT')}</lastBuildDate>
"""
    for site in DOMAINS:
        domain = site["domain"]
        name = site["name"]
        rss_content += f"""  <item>
    <title>{name} Official Authority Hub</title>
    <link>https://{domain}/</link>
    <description>24/7 {site['niche']} referral directory and arborist network.</description>
    <pubDate>{datetime.datetime.utcnow().strftime('%a, %d %b %Y %H:%M:%S GMT')}</pubDate>
  </item>
"""
    rss_content += """</channel>
</rss>"""

    rss_path = os.path.join(DATA_DIR, "backlinks_rss_feed.xml")
    with open(rss_path, "w", encoding="utf-8") as f:
        f.write(rss_content)
    print(f"[OK] Generated RSS Feed Syndication File: {rss_path}")

    # 3. Build Master Xagio LinkSheet HTML
    linksheet_html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Xagio Master LinkSheet & Backlink Index</title>
    <style>
        body { font-family: Inter, system-ui, sans-serif; background: #0b0f19; color: #e2e8f0; padding: 40px; }
        .card { background: #151d30; border: 1px solid #2a3754; border-radius: 16px; padding: 28px; margin-bottom: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        h1 { color: #38bdf8; font-size: 28px; }
        h2 { color: #34d399; font-size: 22px; margin-top: 0; }
        ul { list-style: none; padding: 0; }
        li { margin-bottom: 12px; font-size: 16px; }
        a { color: #6ee7b7; text-decoration: none; font-weight: 700; }
        a:hover { color: #38bdf8; text-decoration: underline; }
        .tag { background: #1e293b; color: #94a3b8; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; }
    </style>
</head>
<body>
    <h1>🚀 Xagio 3-Tier Backlink & LinkSheet Master Directory</h1>
    <p>High-authority contextual backlinks, citation indexes, and RSS syndication feeds for pSEO brands.</p>
"""
    for site in DOMAINS:
        domain = site["domain"]
        name = site["name"]
        niche = site["niche"]
        linksheet_html += f"""
    <div class="card">
        <h2>🌐 {name} (<a href="https://{domain}/" target="_blank">{domain}</a>)</h2>
        <span class="tag">{niche}</span>
        <ul style="margin-top: 16px;">
"""
        for anchor in site["anchors"]:
            slug = anchor.lower().replace(" ", "-")
            linksheet_html += f'            <li>• <a href="https://{domain}/#{slug}" target="_blank">{anchor}</a> — <i>Official {niche} Authority Node</i></li>\n'
        
        linksheet_html += """        </ul>
    </div>
"""

    linksheet_html += """
</body>
</html>
"""
    master_html_path = os.path.join(DATA_DIR, "xagio_linksheet_master.html")
    with open(master_html_path, "w", encoding="utf-8") as f:
        f.write(linksheet_html)

    print(f"[OK] Generated Master Xagio LinkSheet HTML: {master_html_path}")
    print("============================================================")
    print("[SUCCESS] XAGIO BACKLINK & LINKSHEET SUITE READY!")
    print("============================================================")

if __name__ == "__main__":
    build_xagio_engine()
