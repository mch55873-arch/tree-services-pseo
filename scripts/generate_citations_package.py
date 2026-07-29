import json
import os

# Custom Python Script: Generate Ready-to-Submit Directory Citation Package
TARGET_SITE = {
    "business_name": "Can Tree Service",
    "website": "https://cantreeservice.com/",
    "phone": "(380) 209-1328",
    "business_type": "Service Area Business (SAB)",
    "primary_category": "Tree Service & Arborist Care",
    "secondary_categories": [
        "Emergency Tree Removal",
        "Tree Trimming & Pruning",
        "Stump Grinding Service",
        "Hazard Tree Assessment",
        "Storm Damage Clearance"
    ],
    "service_area": "All 50 US States & 30,900+ Cities",
    "short_description": "Nationwide 24/7 emergency tree removal, structural pruning, stump grinding, and crane tree operations.",
    "long_description": "Can Tree Service is a leading nationwide tree care provider operating across 50 US states. Our certified arborist network specializes in 24/7 emergency storm damage clearance, hazardous tree removal, structural trimming, stump grinding, and crane rigging. Upfront estimates and same-day emergency dispatch."
}

DIRECTORIES_TARGETS = [
    {"name": "Manta.com", "url": "https://www.manta.com/add-a-company", "address_required": False},
    {"name": "MerchantCircle.com", "url": "https://www.merchantcircle.com/signup", "address_required": False},
    {"name": "EZLocal.com", "url": "https://ezlocal.com/add", "address_required": False},
    {"name": "Cylex USA", "url": "https://www.cylex-usa.com/add-company", "address_required": False},
    {"name": "Hotfrog USA", "url": "https://www.hotfrog.com/add-your-business", "address_required": False},
    {"name": "ChamberofCommerce.com", "url": "https://www.chamberofcommerce.com/add-business", "address_required": False}
]

def build_citation_kit():
    kit = {
        "business_info": TARGET_SITE,
        "recommended_directories": DIRECTORIES_TARGETS
    }
    
    out_path = os.path.join(os.path.dirname(__file__), "..", "data", "citations_submission_kit.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(kit, f, indent=2)
        
    print("[SUCCESS] Citation Submission Kit created at data/citations_submission_kit.json")

if __name__ == "__main__":
    build_citation_kit()
