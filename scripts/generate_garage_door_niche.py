import json
import os
import re
import sys

# Custom Python Script: Generate Garage Door Repair pSEO Data Package
GARAGE_SERVICES = [
    "Emergency Garage Door Repair",
    "Garage Door Spring Replacement",
    "Garage Door Opener Repair & Installation",
    "Garage Door Cable & Roller Repair",
    "Overhead Garage Door Replacement",
    "Garage Door Off-Track Repair",
    "Commercial Overhead Door Services",
    "Custom Garage Door Installation"
]

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def generate_garage_package():
    print("============================================================")
    print("[pSEO Engine] Generating Garage Door Repair Niche Package")
    print("============================================================")
    
    # Load US Cities Database
    db_path = os.path.join(os.path.dirname(__file__), "..", "data", "usa_database.json")
    with open(db_path, "r", encoding="utf-8") as f:
        usa_data = json.load(f)
        
    total_states = len(usa_data.get("states", []))
    total_cities = sum(len(s.get("cities", [])) for s in usa_data.get("states", []))
    
    print(f"[OK] USA Geographic Database: {total_states} States | {total_cities:,} Cities")
    
    # Build Garage Door Services Config
    garage_services_config = []
    for sname in GARAGE_SERVICES:
        garage_services_config.append({
            "slug": slugify(sname),
            "name": sname,
            "description": f"Professional 24/7 {sname.lower()} by certified local garage technicians. Same-day emergency response, upfront pricing, and spring replacement warranty."
        })
        
    out_path = os.path.join(os.path.dirname(__file__), "..", "data", "garage_door_services.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(garage_services_config, f, indent=2)
        
    print(f"[SUCCESS] Created Garage Door Services Config: data/garage_door_services.json ({len(garage_services_config)} Core Services)")
    print("============================================================")

if __name__ == "__main__":
    generate_garage_package()
