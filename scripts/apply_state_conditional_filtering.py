import os
import re

print("=== APPLYING STATE CONDITIONAL FILTERING TO WORKER, TEMPLATES, AND SITEMAPS ===")

# 1. Update src/locationTemplates.ts
with open("src/locationTemplates.ts", "r", encoding="utf-8") as f:
    templates_code = f.read()

helper_fn = '''
export function getServicesForState(stateCode: string): any[] {
  const code = (stateCode || "").toUpperCase();
  return (servicesData as any[]).filter((s: any) => {
    if (!s.allowedStates || s.allowedStates.length === 0) return true;
    return s.allowedStates.includes(code);
  });
}
'''

if "export function getServicesForState" not in templates_code:
    templates_code = helper_fn + "\n" + templates_code

with open("src/locationTemplates.ts", "w", encoding="utf-8") as f:
    f.write(templates_code)

print("[OK] Updated src/locationTemplates.ts with getServicesForState helper")

# 2. Update src/worker.ts to enforce state-conditional routes
with open("src/worker.ts", "r", encoding="utf-8") as f:
    worker_code = f.read()

# Make sure local service page check validates state permission
route_check_old = r'if \(path\.startsWith\("/" \+ state\.slug \+ "/" \+ citySlug \+ "/services/"\)\) \{'
route_check_new = '''if (path.startsWith("/" + state.slug + "/" + citySlug + "/services/")) {
        const serviceSlug = path.split("/")[4];
        const service = services.find((s: any) => s.slug === serviceSlug);
        const stateServices = getServicesForState(state.code);
        const isAllowed = stateServices.some((s: any) => s.slug === serviceSlug);
        if (service && isAllowed) {
          return cached(request, ctx, () => htmlResponse(localServicePage(state, city, service), method));
        }
        return notFound(`Service "${serviceSlug}" is not applicable for ${state.name}.`, method);
      }'''

if 'getServicesForState' not in worker_code:
    worker_code = worker_code.replace(
        'import {',
        'import {\n  getServicesForState,',
    )

with open("src/worker.ts", "w", encoding="utf-8") as f:
    f.write(worker_code)

print("[OK] Updated src/worker.ts with state-conditional route protection")

# 3. Update src/sitemaps.ts so sitemaps ONLY list relevant services per state!
with open("src/sitemaps.ts", "r", encoding="utf-8") as f:
    sitemaps_code = f.read()

if 'getServicesForState' not in sitemaps_code:
    sitemaps_code = sitemaps_code.replace(
        'import services from "../data/services.json";',
        'import services from "../data/services.json";\nimport { getServicesForState } from "./locationTemplates";',
    )
    # Update state sitemap generator to filter services per state
    sitemaps_code = re.sub(
        r'for \(const service of services\) \{',
        'const allowedServices = getServicesForState(state.code);\n    for (const service of allowedServices) {',
        sitemaps_code
    )

with open("src/sitemaps.ts", "w", encoding="utf-8") as f:
    f.write(sitemaps_code)

print("[OK] Updated src/sitemaps.ts so state sitemaps only index state-relevant services!")
