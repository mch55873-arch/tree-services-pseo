import json
import os
import re

# Custom Python Script: Generate Chimney Sweep & Fireplace Repair pSEO Package
CHIMNEY_SERVICES = [
    "Emergency Chimney Repair",
    "Chimney Sweeping & Creosote Cleaning",
    "Fireplace Inspection & Maintenance",
    "Chimney Liner Repair & Replacement",
    "Chimney Cap & Flashing Installation",
    "Chimney Masonry & Tuckpointing",
    "Gas & Wood Fireplace Repair",
    "Chimney Flue & Leak Repair"
]

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def generate_chimney_package():
    print("============================================================")
    print("[pSEO Engine] Generating Chimney Sweep & Fireplace Repair Package")
    print("============================================================")
    
    # Load US Cities Database
    db_path = os.path.join(os.path.dirname(__file__), "..", "data", "usa_database.json")
    with open(db_path, "r", encoding="utf-8") as f:
        usa_data = json.load(f)
        
    total_states = len(usa_data.get("states", []))
    total_cities = sum(len(s.get("cities", [])) for s in usa_data.get("states", []))
    
    print(f"[OK] Loaded Geographic Database: {total_states} States | {total_cities:,} US Cities")
    
    # Build Services Config
    chimney_services_config = []
    for sname in CHIMNEY_SERVICES:
        chimney_services_config.append({
            "slug": slugify(sname),
            "name": sname,
            "description": f"Certified 24/7 {sname.lower()} by licensed fireplace specialists. Same-day emergency inspection, creosote removal, masonry repair, and safety compliance."
        })
        
    out_path = os.path.join(os.path.dirname(__file__), "..", "data", "chimney_services.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(chimney_services_config, f, indent=2)
        
    print(f"[SUCCESS] Created Chimney Services Config: data/chimney_services.json ({len(chimney_services_config)} Core Services)")
    print("============================================================")

if __name__ == "__main__":
    generate_chimney_package()
