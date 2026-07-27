import json
import os
import re

# Custom Python script to automate pSEO geographic data generation for any niche
def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def generate_niche_database(niche_name, services_list):
    print(f"[pSEO Engine] Generating pSEO Data Package for Niche: {niche_name}")
    
    # Load US base database
    db_path = os.path.join(os.path.dirname(__file__), "..", "data", "usa_database.json")
    with open(db_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    total_states = len(data.get("states", []))
    total_cities = sum(len(s.get("cities", [])) for s in data.get("states", []))
    
    print(f"[OK] Loaded {total_states} States and {total_cities:,} US Cities/Communities.")
    
    # Generate Services Configuration JSON
    formatted_services = []
    for idx, sname in enumerate(services_list, start=1):
        formatted_services.append({
            "slug": slugify(sname),
            "name": sname,
            "description": f"Professional 24/7 {sname.lower()} services by licensed local specialists. Upfront quotes and same-day response."
        })
        
    services_path = os.path.join(os.path.dirname(__file__), "..", "data", "services_config.json")
    with open(services_path, "w", encoding="utf-8") as f:
        json.dump(formatted_services, f, indent=2)
        
    print(f"[SUCCESS] Created {len(formatted_services)} Services in data/services_config.json")
    print("[DONE] Custom Python Automation Complete!")

if __name__ == "__main__":
    TREE_SERVICES = [
        "Emergency Tree Removal",
        "Tree Trimming & Pruning",
        "Stump Grinding & Removal",
        "Hazard Tree Assessment",
        "Storm Damage Clearance",
        "Land & Lot Clearing",
        "Tree Cabling & Bracing",
        "Palm Tree Trimming & Removal"
    ]
    generate_niche_database("Tree Care & Removal", TREE_SERVICES)
