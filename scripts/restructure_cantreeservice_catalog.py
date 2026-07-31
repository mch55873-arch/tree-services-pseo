import json
import os

print("=== RESTRUCTURING CAN TREE SERVICE CATALOG & APPLYING CLAUDE'S STRATEGIC RULES ===")

# Define the new lean, high-intent, climate-conditional 25-service catalog
optimized_services = [
  # --- CORE REMOVAL & CUTTING (High Volume / All States) ---
  {
    "slug": "tree-removal",
    "name": "Tree Removal Service",
    "icon": "🪓",
    "category": "Removal",
    "tier": "core",
    "isCore": True,
    "description": "Safe, professional tree removal for dead, hazardous, leaning, or storm-damaged trees using crane and rigging equipment.",
    "allowedStates": [] # Empty means ALL 50 States
  },
  {
    "slug": "tree-cutting-service",
    "name": "Tree Cutting Service",
    "icon": "🪓",
    "category": "Removal",
    "tier": "core",
    "isCore": True,
    "description": "Affordable tree cutting, branch drop, and sectioning services for residential yards and commercial properties.",
    "allowedStates": []
  },
  {
    "slug": "crane-tree-removal",
    "name": "Crane-Assisted Tree Removal",
    "icon": "🏗️",
    "category": "Removal",
    "tier": "core",
    "isCore": True,
    "description": "Specialized heavy crane tree removal for massive trees over houses, power lines, and zero-clearance tight spaces.",
    "allowedStates": []
  },
  {
    "slug": "stump-grinding",
    "name": "Stump Grinding Service",
    "icon": "⚙️",
    "category": "Removal",
    "tier": "core",
    "isCore": True,
    "description": "High-powered hydraulic stump grinding to shave tree stumps 6 to 12 inches below ground level.",
    "allowedStates": []
  },
  {
    "slug": "stump-removal",
    "name": "Full Stump & Root Ball Removal",
    "icon": "🚜",
    "category": "Removal",
    "tier": "core",
    "isCore": True,
    "description": "Complete excavation of underground root balls and stubborn stumps for new construction, paving, or replanting.",
    "allowedStates": []
  },

  # --- TRIMMING & CANOPY PRUNING (High Volume / All States) ---
  {
    "slug": "tree-trimming",
    "name": "Tree Trimming & Pruning",
    "icon": "✂️",
    "category": "Trimming",
    "tier": "core",
    "isCore": True,
    "description": "Enhance tree structural health, clearance, and curb appeal with professional canopy trimming and deadwooding.",
    "allowedStates": []
  },
  {
    "slug": "crown-reduction-thinning",
    "name": "Crown Reduction & Canopy Thinning",
    "icon": "🍃",
    "category": "Trimming",
    "tier": "core",
    "isCore": True,
    "description": "Reduce canopy height and wind resistance safely using ISA-approved drop-crotch pruning techniques.",
    "allowedStates": []
  },
  {
    "slug": "crown-lifting",
    "name": "Crown Raising & Lower Branch Clearance",
    "icon": "✂️",
    "category": "Trimming",
    "tier": "core",
    "isCore": True,
    "description": "Prune lower branches to clear driveways, roofs, sidewalks, power drops, and lawn mowers.",
    "allowedStates": []
  },
  {
    "slug": "hedge-trimming-shaping",
    "name": "Hedge Trimming & Privacy Screen Pruning",
    "icon": "✂️",
    "category": "Trimming",
    "tier": "core",
    "isCore": True,
    "description": "Precision shearing and pruning for arborvitae, boxwood, laurel, and tall evergreen privacy hedges.",
    "allowedStates": []
  },

  # --- EMERGENCY & STORM CARE (High Intent) ---
  {
    "slug": "storm-damage-cleanup",
    "name": "Emergency Storm Damage Cleanup",
    "icon": "⛈️",
    "category": "Emergency",
    "tier": "core",
    "isCore": True,
    "description": "24/7 rapid response for fallen storm trees blocking driveways, roofs, power lines, and roads.",
    "allowedStates": []
  },
  {
    "slug": "emergency-tarping-roofs",
    "name": "Emergency Roof Tarping Service",
    "icon": "⛺",
    "category": "Emergency",
    "tier": "core",
    "isCore": True,
    "description": "Immediate heavy-duty weather tarping over roof punctures caused by fallen trees and heavy storm limbs.",
    "allowedStates": []
  },
  {
    "slug": "power-line-tree-clearing",
    "name": "Power Line Branch Clearing",
    "icon": "⚡",
    "category": "Emergency",
    "tier": "core",
    "isCore": True,
    "description": "Safe trimming and branch clearing around electrical utility service drops and overhead wires.",
    "allowedStates": []
  },

  # --- LAND CLEARING & FIRE PREVENTATIVE ---
  {
    "slug": "lot-land-clearing",
    "name": "Lot & Land Clearing Service",
    "icon": "🚜",
    "category": "Land Prep",
    "tier": "core",
    "isCore": True,
    "description": "Complete residential lot clearing, brush removal, small tree grubbing, and site prep for building.",
    "allowedStates": []
  },
  {
    "slug": "brush-clearing-mulching",
    "name": "Brush Clearing & Forestry Mulching",
    "icon": "🧹",
    "category": "Land Prep",
    "tier": "core",
    "isCore": True,
    "description": "Heavy brush hogging, blackberry clearing, and forestry mulching to reclaim overgrown property.",
    "allowedStates": []
  },
  {
    "slug": "commercial-land-clearing",
    "name": "Commercial Heavy Land Clearing",
    "icon": "🏗️",
    "category": "Land Prep",
    "tier": "core",
    "isCore": True,
    "description": "Bulldozer, excavator, and timber clearing for commercial developments, HOAs, and subdivisions.",
    "allowedStates": []
  },

  # --- ARBORIST HEALTH & CARE ---
  {
    "slug": "arborist-inspection",
    "name": "Certified Arborist Assessment",
    "icon": "📋",
    "category": "Health",
    "tier": "core",
    "isCore": True,
    "description": "Comprehensive arborist inspection, disease diagnosis, hazardous tree risk assessment, and legal reports.",
    "allowedStates": []
  },
  {
    "slug": "tree-disease-treatment",
    "name": "Tree Disease & Insect Pest Control",
    "icon": "🧪",
    "category": "Health",
    "tier": "core",
    "isCore": True,
    "description": "Trunk injection, soil drenching, and canopy sprays for fungal blight, borer beetles, and root rot.",
    "allowedStates": []
  },
  {
    "slug": "deep-root-fertilization",
    "name": "Deep Root Soil Fertilization",
    "icon": "🌱",
    "category": "Health",
    "tier": "core",
    "isCore": True,
    "description": "High-pressure root zone liquid fertilizer injection to revitalize stressed, declining, or yellowing shade trees.",
    "allowedStates": []
  },
  {
    "slug": "tree-cabling-bracing",
    "name": "Tree Cabling & Structural Bracing",
    "icon": "⛓️",
    "category": "Protection",
    "tier": "core",
    "isCore": True,
    "description": "Install flexible steel cables and rigid threaded brace rods to support split V-crotches and heavy leaning limbs.",
    "allowedStates": []
  },

  # --- HIGH-VALUE / PERMIT ASSISTANCE ---
  {
    "slug": "tree-permit-acquisition",
    "name": "Tree Removal Permit Assistance",
    "icon": "📄",
    "category": "Permits",
    "tier": "core",
    "isCore": True,
    "description": "Arborist reports, city permit filing, and compliance documentation for protected municipal tree removals.",
    "allowedStates": []
  },
  {
    "slug": "tree-mulching-chipping",
    "name": "Tree Mulching & Wood Chipping",
    "icon": "🍂",
    "category": "Maintenance",
    "tier": "core",
    "isCore": True,
    "description": "On-site branch chipping, wood waste processing, and fresh organic hardwood mulch delivery.",
    "allowedStates": []
  },

  # =========================================================================
  # --- REGIONAL & CLIMATE CONDITIONAL SERVICES (CLAUDE'S TOP RULE) ---
  # =========================================================================
  {
    "slug": "palm-tree-service",
    "name": "Palm Tree Trimming & Removal",
    "icon": "🌴",
    "category": "Regional",
    "tier": "regional",
    "isCore": False,
    "description": "Professional palm frond trimming, seed pod shaving, trunk skinning, and palm removal.",
    "allowedStates": ["FL", "CA", "TX", "AZ", "HI", "GA", "SC", "NC", "NV", "LA", "MS", "AL"]
  },
  {
    "slug": "tree-de-icing-snow-removal",
    "name": "Winter Tree Snow & Ice Damage Clearing",
    "icon": "❄️",
    "category": "Regional",
    "tier": "regional",
    "isCore": False,
    "description": "Emergency clearing and bracing for limbs weighed down by heavy winter snow, ice storms, and blizzards.",
    "allowedStates": ["MN", "WI", "ME", "NH", "VT", "NY", "CO", "WY", "MT", "ND", "SD", "ID", "MI", "IL", "IA", "MA", "CT", "RI", "PA", "OH", "IN", "AK"]
  },
  {
    "slug": "wildfire-defensible-space",
    "name": "Wildfire Defensible Space Clearing",
    "icon": "🔥",
    "category": "Regional",
    "tier": "regional",
    "isCore": False,
    "description": "Brush clearing, ladder fuel removal, and tree spacing to meet CAL FIRE and state wildfire defense regulations.",
    "allowedStates": ["CA", "CO", "OR", "WA", "AZ", "NM", "NV", "UT", "MT", "ID", "WY"]
  },
  {
    "slug": "oak-wilt-treatment",
    "name": "Oak Wilt Diagnosis & Treatment",
    "icon": "🌳",
    "category": "Regional",
    "tier": "regional",
    "isCore": False,
    "description": "Propiconazole trunk injections and root trenching to stop deadly oak wilt fungal transmission.",
    "allowedStates": ["TX", "MN", "WI", "IA", "IL", "MI", "IN", "OH", "PA", "WV", "VA", "NC", "SC", "GA", "KS", "NE", "MO", "AR"]
  },
  {
    "slug": "pine-beetle-treatment",
    "name": "Pine Bark Beetle Treatment",
    "icon": "🌲",
    "category": "Regional",
    "tier": "regional",
    "isCore": False,
    "description": "Preventative chemical sprays and trunk treatments to protect pine stands against mountain pine beetle attacks.",
    "allowedStates": ["CO", "CA", "OR", "WA", "MT", "ID", "WY", "TX", "GA", "NC", "SC", "AL", "FL"]
  }
]

# Write to data/services.json
with open("data/services.json", "w", encoding="utf-8") as f:
  json.dump(optimized_services, f, indent=2)

print(f"[OK] Successfully wrote {len(optimized_services)} optimized, regional-conditional services to data/services.json")
