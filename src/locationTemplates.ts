export function getServicesForState(stateCode: string): any[] {
  const code = (stateCode || "").toUpperCase();
  return (servicesData as any[]).filter((s: any) => {
    if (!s.allowedStates || s.allowedStates.length === 0) return true;
    return s.allowedStates.includes(code);
  });
}

export function getRegionalData(stateCode: string) {
  const code = (stateCode || "").toUpperCase();
  const southeast = ["FL", "GA", "SC", "NC", "AL", "MS", "LA", "TX", "TN", "AR"];
  const northeastMidwest = ["PA", "OH", "MI", "IL", "IN", "NY", "MA", "MN", "WI", "NJ", "CT", "RI", "NH", "VT", "ME", "DE", "MD", "VA", "WV"];
  const westSouthwest = ["CA", "CO", "WA", "OR", "AZ", "NV", "UT", "NM", "ID", "MT", "WY"];

  if (southeast.includes(code)) {
    return {
      climateRisk: "Subtropical Storm Surge & High-Wind Canopy Failure Zone",
      regulations: "County Tree Protection Ordinance & Electrical Overhead Drop Clearances",
      nativeSpecies: "Live Oaks, Sabal Palms, Loblolly Pines, & Southern Magnolias",
      seasonNote: "Peak hurricane season pruning & storm hazard reduction recommended prior to summer weather fronts."
    };
  } else if (northeastMidwest.includes(code)) {
    return {
      climateRisk: "Heavy Winter Ice Storm & Freeze-Thaw Limb Fracture Zone",
      regulations: "Municipal Shade Tree Commission Standards & Public Utility Right-of-Way Rules",
      nativeSpecies: "Sugar Maples, White Oaks, Black Walnuts, & Eastern White Pines",
      seasonNote: "Dormant winter pruning recommended to prevent snow-weight limb collapse and structural decay."
    };
  } else if (westSouthwest.includes(code)) {
    return {
      climateRisk: "Wildfire Defensible Space & High-Drought Canopy Stress Zone",
      regulations: "CAL FIRE / Western State Wildfire Fuel Mitigation Codes (100ft Defensible Space)",
      nativeSpecies: "Ponderosa Pines, Douglas Firs, Coastal Redwoods, & Fan Palms",
      seasonNote: "Defensible space clearing and ladder fuel removal essential ahead of high-risk fire season."
    };
  }

  return {
    climateRisk: "Seasonal High-Wind & Hazard Limb Fracture Risk Zone",
    regulations: "Local Municipal Tree Care Regulations & Utility Safety Standards",
    nativeSpecies: "Regional Hardwoods, Evergreen Pines, & Local Shade Canopy Trees",
    seasonNote: "Annual arborist inspection and preventive structural trimming recommended."
  };
}

import articles from "../data/articles.json";
import services from "../data/services.json";
import servicesData from "../data/services.json";

export type StateItem = {
  code: string;
  name: string;
  slug: string;
  cities: [string, string][];
};

const DOMAIN = "cantreeservice.com";
const BRAND = "Can Tree Service";
const PHONE_DISPLAY = "+1 (380) 209-1328";
const PHONE_HREF = "tel:+13802091328";
const ADDRESS = "350 N High St, Columbus, OH 43215";

function esc(str: string): string {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&#039;");
}

const CSS = `
*{box-sizing:border-box}html{scroll-behavior:smooth;overflow-x:hidden}
body{margin:0;background:#0d1b2a;color:#f8fafc;font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
img,svg,video{max-width:100%;height:auto}
table{display:block;overflow-x:auto;max-width:100%}
a{color:inherit;text-decoration:none}
.wrap{width:min(1280px,calc(100% - 24px));margin:auto}

.top-bar{background:#0b1320;color:#cbd5e1;font-size:13px;border-bottom:1px solid rgba(255,255,255,.08)}
.top-bar .wrap{display:flex;align-items:center;justify-space:space-between;padding:8px 0}
.top-left,.top-right{display:flex;align-items:center;gap:14px}
.pulse-dot{width:8px;height:8px;border-radius:50%;background:#10b981;display:inline-block;box-shadow:0 0 10px #10b981}
.sep{color:#475569}
.stars{color:#fbbf24;letter-spacing:2px;font-size:14px}

.navbar{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.98);backdrop-filter:blur(16px);border-bottom:1px solid #e2e8f0;box-shadow:0 8px 30px rgba(0,0,0,.08);color:#0f172a}
.navbar .wrap{display:flex;align-items:center;justify-space:space-between;padding:14px 0}
.brand{display:flex;align-items:center;gap:12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:900;color:#0d1b2a;letter-spacing:-.03em}
.logo-icon{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;background:linear-gradient(135deg,#0ea5e9,#06b6d4);color:#fff;font-size:22px;box-shadow:0 8px 20px rgba(14,165,233,.3)}
.brand-sub{display:block;font-size:11px;letter-spacing:.02em;color:#64748b;font-family:'Inter',sans-serif;font-weight:500;margin-top:-2px}

.nav-links{display:flex;align-items:center;gap:14px;font-size:14px;font-weight:600;color:#334155}
.nav-links a{padding:6px 10px;border-radius:10px;transition:.2s;white-space:nowrap}
.nav-links a:hover{color:#0ea5e9;background:#f8fafc}

.dropdown{position:relative;display:inline-block}
.dropdown:hover .dropdown-menu{display:block}
.dropdown-menu{display:none;position:absolute;top:100%;left:0;width:280px;background:#fff;border-radius:16px;box-shadow:0 20px 48px rgba(0,0,0,.15);border:1px solid #e2e8f0;padding:10px;z-index:100}
.dropdown-menu a{display:block;padding:10px 14px;font-size:14px;color:#334155;border-radius:10px;font-weight:600}
.dropdown-menu a:hover{background:#f1f5f9;color:#0ea5e9}
.dropdown-menu a.highlight{color:#0ea5e9;font-weight:800;border-top:1px solid #f1f5f9;margin-top:6px;padding-top:12px}

.btn-cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 24px;border-radius:14px;background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:16px;box-shadow:0 8px 24px rgba(249,115,22,.35);transition:.25s;border:none;cursor:pointer}
.btn-cta:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(249,115,22,.5);background:linear-gradient(135deg,#fb923c,#f97316)}
.btn-dark-navy{background:#0d1b2a;color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;padding:14px 28px;border-radius:14px;display:inline-flex;align-items:center;gap:8px;font-size:16px;transition:.2s;box-shadow:0 8px 20px rgba(0,0,0,.2)}
.btn-dark-navy:hover{transform:translateY(-2px);background:#14263b}
.btn-glass-cyan{background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.4);color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;padding:14px 28px;border-radius:14px;display:inline-flex;align-items:center;gap:8px;font-size:16px;transition:.2s;backdrop-filter:blur(8px)}
.btn-glass-cyan:hover{background:rgba(255,255,255,.3);transform:translateY(-2px)}

.page-hero{position:relative;padding:76px 0 88px;background:linear-gradient(rgba(13,27,42,.88),rgba(13,27,42,.95)),url('https://images.pexels.com/photos/1573894/pexels-photo-1573894.jpeg?auto=compress&cs=tinysrgb&w=1600') center/cover no-repeat;overflow:hidden}
.page-hero h1{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(38px,5vw,56px);font-weight:900;line-height:1.1;margin:16px 0 14px;color:#fff;max-width:820px;letter-spacing:-.03em}
.page-hero h1 span{color:#38bdf8}
.crumb-trail{font-size:14px;color:#38bdf8;font-weight:700;margin-bottom:14px}
.crumb-trail a{color:#94a3b8;transition:.2s}.crumb-trail a:hover{color:#fff}
.tag-badge{display:inline-block;padding:6px 14px;border-radius:999px;background:#e0f2fe;color:#0284c7;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:12px}

.sec-white{background:#fff;color:#0f172a;padding:84px 0}
.sec-dark{background:#0d1b2a;color:#fff;padding:84px 0}
.sec-slate{background:#14263b;color:#fff;padding:84px 0}
.sec-gray{background:#f8fafc;color:#0f172a;padding:84px 0}
.sec-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(30px,4vw,44px);font-weight:900;line-height:1.15;margin:0 0 14px;letter-spacing:-.03em}

.stats-bar{background:#0b1320;border-top:1px solid rgba(255,255,255,.08);border-bottom:1px solid rgba(255,255,255,.08);padding:32px 0}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;text-align:center}
.stat-item h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:36px;font-weight:900;color:#38bdf8;margin:0}
.stat-item p{font-size:13px;font-weight:700;color:#94a3b8;margin:4px 0 0;text-transform:uppercase;letter-spacing:.05em}

.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.dir-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:20px}
.dir-card-white{display:flex;align-items:center;justify-space:space-between;padding:16px 20px;background:#fff;border:1px solid #e2e8f0;border-radius:14px;color:#0d1b2a;font-weight:700;font-size:14px;transition:.25s;box-shadow:0 4px 12px rgba(0,0,0,.02);text-decoration:none}
.dir-card-white:hover{transform:translateY(-3px);border-color:#0ea5e9;color:#0ea5e9;box-shadow:0 12px 28px rgba(14,165,233,.15)}
.dir-card-white:after{content:"→";color:#0ea5e9;font-weight:900}

.service-hub-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:26px;box-shadow:0 8px 24px rgba(0,0,0,.03);transition:.25s;display:flex;flex-direction:column;justify-space:space-between}
.service-hub-card:hover{transform:translateY(-5px);border-color:#0ea5e9;box-shadow:0 16px 36px rgba(14,165,233,.12)}
.service-hub-icon{width:42px;height:42px;border-radius:12px;background:#e0f2fe;color:#0284c7;display:grid;place-items:center;font-size:20px;margin-bottom:16px}
.service-hub-card h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:19px;font-weight:800;color:#0d1b2a;margin:0 0 8px}
.service-hub-card p{color:#64748b;font-size:14px;line-height:1.6;margin:0 0 16px}
.service-hub-card a{color:#0ea5e9;font-weight:800;font-size:14px}

.blog-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.03);transition:.25s;display:flex;flex-direction:column;justify-space:space-between}
.blog-card:hover{transform:translateY(-5px);border-color:#0ea5e9;box-shadow:0 16px 36px rgba(14,165,233,.12)}
.blog-card-img{width:100%;height:190px;object-fit:cover}
.blog-card-body{padding:22px;display:flex;flex-direction:column;flex-grow:1;justify-space:between}
.blog-date{font-size:12px;font-weight:700;color:#94a3b8;margin-bottom:8px}
.blog-card-body h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:17px;font-weight:800;color:#0d1b2a;line-height:1.35;margin:0 0 10px}
.blog-card-body p{color:#64748b;font-size:13px;line-height:1.6;margin:0 0 16px}
.blog-card-body a{color:#0ea5e9;font-weight:800;font-size:13px;display:inline-flex;align-items:center;gap:4px}

.service-main-grid{display:grid;grid-template-columns:1fr 380px;gap:44px;align-items:start}
.service-content-box{background:#fff;color:#0f172a;padding:40px;border-radius:20px;box-shadow:0 10px 40px rgba(0,0,0,.04);border:1px solid #e2e8f0}
.service-content-box h2{font-family:'Plus Jakarta Sans',sans-serif;font-size:28px;font-weight:900;color:#0d1b2a;margin:0 0 16px;letter-spacing:-.02em}
.service-content-box p{color:#475569;font-size:15px;line-height:1.75;margin:0 0 16px}

.warning-cards-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:20px 0 32px}
.warning-card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px;font-weight:700;font-size:14px;color:#0d1b2a}
.warning-card span{color:#f97316;font-size:18px}

.checklist-2col{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:20px 0 32px;font-size:14px;font-weight:700;color:#1e293b}
.check-item-line{display:flex;align-items:center;gap:8px}
.check-item-line span{color:#0ea5e9;font-weight:900}

.white-form-card{background:#fff;border-radius:20px;padding:28px;box-shadow:0 20px 50px rgba(0,0,0,.08);border:1px solid #e2e8f0;color:#0f172a}
.white-form-card h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:900;color:#0d1b2a;margin:0 0 4px}
.white-form-card p{font-size:12px;color:#64748b;margin:0 0 18px}

.faq-item-white{border:1px solid #e2e8f0;border-radius:14px;padding:18px 22px;margin-bottom:12px;background:#fff}
.faq-item-white summary{font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:800;color:#0d1b2a;cursor:pointer;list-style:none;display:flex;align-items:center;justify-space:between}
.faq-item-white summary:after{content:"▼";font-size:12px;color:#0ea5e9}
.faq-item-white p{color:#64748b;font-size:14px;line-height:1.65;margin:12px 0 0}

.footer-cta-banner{background:linear-gradient(135deg,#0ea5e9,#0284c7);color:#fff;padding:52px 0}
.footer-cta-flex{display:flex;align-items:center;justify-space:space-between;gap:24px}
.footer-cta-flex h2{font-family:'Plus Jakarta Sans',sans-serif;font-size:32px;font-weight:900;margin:0 0 6px;color:#fff}
.footer-cta-flex p{font-size:16px;margin:0;opacity:.95}
.footer-cta-btns{display:flex;align-items:center;gap:14px}

.footer-main{background:#0d1b2a;color:#94a3b8;padding:72px 0 32px;border-top:1px solid rgba(255,255,255,.08)}
.footer-grid{display:grid;grid-template-columns:1.3fr 1fr 1fr 1.2fr;gap:40px}
.footer-main h3{font-family:'Plus Jakarta Sans',sans-serif;color:#fff;margin-top:0;font-size:18px;font-weight:800}
.footer-main a{display:block;color:#94a3b8;margin:12px 0;transition:.2s;font-size:14px;font-weight:500}
.footer-main a:hover{color:#38bdf8}

.footer-bottom{background:#08101a;border-top:1px solid rgba(255,255,255,.08);padding:24px 0;font-size:13px;color:#64748b}
.footer-bottom .wrap{display:flex;align-items:center;justify-space:space-between}
.footer-bottom-links{display:flex;gap:20px}
.footer-bottom-links a{color:#94a3b8;transition:.2s}.footer-bottom-links a:hover{color:#fff}

.sticky-bar{position:fixed;bottom:20px;right:20px;z-index:90}
@media(max-width:960px){
  .nav-links{display:none}
  .page-hero .wrap, .service-main-grid{grid-template-columns:1fr!important;gap:32px!important}
  .grid-3,.grid-4,.dir-grid,.stats-grid{grid-template-columns:repeat(2,1fr)}
  .footer-grid,.footer-cta-flex{grid-template-columns:1fr;flex-direction:column;align-items:start}
  .sec-white,.sec-gray,.sec-dark,.sec-slate{padding:54px 0}
  .page-hero{padding:52px 0 60px}
}
@media(max-width:640px){
  .top-bar .top-right{display:none}
  .top-bar .wrap{justify-content:center;text-align:center}
  .navbar .wrap{flex-wrap:wrap;gap:12px}
  .brand{font-size:17px}
  .logo-icon{width:38px;height:38px;font-size:18px}
  .dir-grid,.grid-3,.grid-4,.stats-grid,.warning-cards-grid,.checklist-2col{grid-template-columns:1fr!important}
  .service-content-box{padding:24px!important}
  .white-form-card{padding:20px!important}
  .footer-bottom .wrap{flex-direction:column;gap:12px;text-align:center}
  .footer-bottom-links{flex-wrap:wrap;justify-content:center;gap:12px}
  .sticky-bar{left:12px;right:12px;bottom:12px}
  .btn-cta{width:100%}
}
`;

function mapEmbedHtml(locationName: string) {
  const query = encodeURIComponent(locationName + ", USA");
  return `<div style="margin-top:36px;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.08);border:1px solid #e2e8f0;background:#fff;padding:12px;">
    <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:17px;font-weight:800;color:#0d1b2a;margin-bottom:10px;display:flex;align-items:center;gap:8px;">
      <span>📍</span> Interactive Service Area Map &amp; Coverage Zone — ${esc(locationName)}
    </div>
    <iframe src="https://maps.google.com/maps?q=${query}&t=&z=11&ie=UTF8&iwloc=&output=embed" width="100%" height="360" style="border:0;border-radius:12px;" allowfullscreen="" loading="lazy"></iframe>
  </div>`;
}

function header(): string {
  return `<div class="top-bar">
    <div class="wrap">
      <div class="top-left">
        <span class="pulse-dot"></span> <b>24/7 Emergency Tree Service Dispatch</b>
        <span class="sep">|</span>
        <span>Mon–Sun 24 Hours Open</span>
      </div>
      <div class="top-right">
        <span class="stars">★★★★★</span> <b>4.9 (17,200+ reviews)</b>
        <span class="sep">|</span>
        <span>ISA Certified &amp; Insured · Master Arborists</span>
      </div>
    </div>
  </div>
  <header class="navbar">
    <div class="wrap">
      <a class="brand" href="https://${DOMAIN}/">
        <span class="logo-icon">🌳</span>
        <span>${BRAND}<small class="brand-sub">Tree Removal · Trimming · Stump Grinding</small></span>
      </a>
      <nav class="nav-links">
        <a href="https://${DOMAIN}/">Home</a>
        <div class="dropdown">
          <a href="https://${DOMAIN}/services/">Services ▾</a>
          <div class="dropdown-menu">
            <a href="https://${DOMAIN}/services/tree-removal/">Emergency Tree Removal</a>
            <a href="https://${DOMAIN}/services/tree-trimming/">Tree Trimming &amp; Pruning</a>
            <a href="https://${DOMAIN}/services/stump-grinding/">Stump Grinding Service</a>
            <a href="https://${DOMAIN}/services/arborist-inspection/">Certified Arborist Inspection</a>
            <a href="https://${DOMAIN}/services/" class="highlight">View All ${services.length} Services →</a>
          </div>
        </div>
        <div class="dropdown">
          <a href="https://${DOMAIN}/areas-we-serve/">Service Areas ▾</a>
          <div class="dropdown-menu">
            <a href="https://pennsylvania.${DOMAIN}/">Pennsylvania</a>
            <a href="https://texas.${DOMAIN}/">Texas</a>
            <a href="https://florida.${DOMAIN}/">Florida</a>
            <a href="https://california.${DOMAIN}/">California</a>
            <a href="https://${DOMAIN}/areas-we-serve/" class="highlight">All 50 States Directory →</a>
          </div>
        </div>
        <a href="https://${DOMAIN}/articles/">Guides</a>
        <a href="https://${DOMAIN}/about/">About</a>
        <a href="https://${DOMAIN}/contact/">Contact</a>
      </nav>
      <a class="btn-cta" href="${PHONE_HREF}">📞 ${PHONE_DISPLAY}</a>
    </div>
  </header>`;
}

function footer(): string {
  return `
  <section class="footer-cta-banner">
    <div class="wrap footer-cta-flex">
      <div>
        <h2>Hazardous Tree or Emergency Storm Damage?</h2>
        <p>Same-day arborist dispatch &amp; certified tree removal across all 50 states.</p>
      </div>
      <div class="footer-cta-btns">
        <a href="${PHONE_HREF}" class="btn-dark-navy">📞 Call ${PHONE_DISPLAY}</a>
        <a href="https://${DOMAIN}/contact/" class="btn-glass-cyan">Request Online Quote</a>
      </div>
    </div>
  </section>
  <footer class="footer-main">
    <div class="wrap footer-grid">
      <div>
        <div class="brand" style="color:#fff;margin-bottom:14px;">
          <span class="logo-icon">🌳</span>
          <span>${BRAND}</span>
        </div>
        <p style="font-size:14px;line-height:1.65;color:#94a3b8;">Nationwide certified arborist &amp; tree care referral network. Licensed, insured, and independent tree specialists across all 50 US states.</p>
        <div class="stars">★★★★★ <span style="color:#fff;font-size:13px;">4.9/5 · 17,200+ Verified Reviews</span></div>
      </div>
      <div>
        <h3>Tree Care Services</h3>
        <a href="https://${DOMAIN}/services/tree-removal/">Emergency Tree Removal</a>
        <a href="https://${DOMAIN}/services/tree-trimming/">Trimming &amp; Pruning</a>
        <a href="https://${DOMAIN}/services/stump-grinding/">Stump Grinding</a>
        <a href="https://${DOMAIN}/services/arborist-inspection/">Arborist Health Check</a>
        <a href="https://${DOMAIN}/services/storm-clearance/">Storm Damage Clearance</a>
        <a href="https://${DOMAIN}/services/" style="color:#38bdf8;font-weight:700;">All ${services.length} Services →</a>
      </div>
      <div>
        <h3>Service Areas</h3>
        <a href="https://${DOMAIN}/areas-we-serve/">All 50 States &amp; DC</a>
        <a href="https://california.${DOMAIN}/">California Services</a>
        <a href="https://texas.${DOMAIN}/">Texas Services</a>
        <a href="https://florida.${DOMAIN}/">Florida Services</a>
        <a href="https://pennsylvania.${DOMAIN}/">Pennsylvania Services</a>
        <a href="https://${DOMAIN}/areas-we-serve/" style="color:#38bdf8;font-weight:700;">All 30,900+ Cities →</a>
      </div>
      <div>
        <h3>Get In Touch</h3>
        <a href="${PHONE_HREF}" style="color:#fff;font-weight:800;font-size:16px;">📞 ${PHONE_DISPLAY}</a>
        <p style="font-size:14px;color:#94a3b8;margin:10px 0 6px;">✉️ dispatch@${DOMAIN}</p>
        <p style="font-size:14px;color:#94a3b8;margin:0 0 6px;">📍 ${ADDRESS}</p>
        <p style="font-size:14px;color:#38bdf8;margin:0;font-weight:700;">🕒 Mon–Sun 24 Hours · 24/7 Emergency Response</p>
      </div>
    </div>
  </footer>
  <div class="footer-bottom">
    <div class="wrap">
      <p>© ${new Date().getFullYear()} ${BRAND}. All rights reserved.</p>
      <div class="footer-bottom-links">
        <a href="https://${DOMAIN}/about/">About</a>
        <a href="https://${DOMAIN}/services/">Services</a>
        <a href="https://${DOMAIN}/areas-we-serve/">Areas</a>
        <a href="https://${DOMAIN}/articles/">Guides</a>
        <a href="https://${DOMAIN}/privacy-policy/">Privacy Policy</a>
        <a href="https://${DOMAIN}/terms/">Terms</a>
        <a href="https://${DOMAIN}/disclaimer/">Disclaimer</a>
        <a href="https://${DOMAIN}/contact/">Contact</a>
      </div>
    </div>
  </div>;
}

function shell(title: string, description: string, canonical: string, body: string, schema?: object): string {
  const schemaScript = schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : "";
  return `<!doctype html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="index,follow">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap" media="print" onload="this.media='all'">
  <style>${CSS}</style>
  ${schemaScript}
</head>
<body>
  ${header()}
  ${body}
  ${footer()}
  <div class="sticky-bar"><a class="btn-cta" href="${PHONE_HREF}">⚡ Call ${PHONE_DISPLAY}</a></div>
</body>
</html>`;
}

export function nationalServicePage(service: any) {
  const canonical = `https://${DOMAIN}/services/${service.slug}/`;
  const serviceTitle = service.name || service.title || "Tree Service";
  const serviceSummary = service.description || service.summary || "Professional tree service across all 50 states.";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: serviceTitle,
        description: serviceSummary,
        provider: { "@type": "Organization", name: BRAND, url: `https://${DOMAIN}/` },
        areaServed: { "@type": "Country", name: "United States" }
      }
    ]
  };

  const body = `<main>
  <section class="page-hero">
    <div class="wrap" style="display:grid;grid-template-columns:1fr 380px;gap:44px;align-items:start;">
      <div>
        <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/services/">Services</a> / ${esc(serviceTitle)}</div>
        <span class="tag-badge">SAME-DAY ARBORIST DISPATCH</span>
        <h1>${esc(serviceTitle)} <span>Guide &amp; Referral Hub</span></h1>
        <p style="color:#cbd5e1;font-size:16px;line-height:1.7;">Fast, ISA-certified, and licensed arborist response across all 50 states. 24/7 emergency tree removal, crane rigging, and stump grinding.</p>
        <div style="display:flex;gap:14px;margin-top:24px;">
          <a class="btn-cta" href="${PHONE_HREF}">📞 Call ${PHONE_DISPLAY}</a>
          <a class="btn-glass-cyan" href="https://${DOMAIN}/contact/">Request Free Quote</a>
        </div>
      </div>
      <div>
        <div class="white-form-card">
          <h3>Request Free Quote</h3>
          <p>Get best price estimate for tree service</p>
          <form action="${PHONE_HREF}" method="GET">
            <div style="margin-bottom:12px;"><input type="text" placeholder="Your Full Name *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <div style="margin-bottom:12px;"><input type="tel" placeholder="Phone Number *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <button type="submit" class="btn-cta" style="width:100%;min-height:50px;">Submit &amp; Call ${PHONE_DISPLAY}</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <section class="sec-gray" style="padding:70px 0;">
    <div class="wrap service-main-grid">
      <div class="service-content-box">
        <span class="tag-badge">CERTIFIED TREE CARE</span>
        <h2>Trusted ${esc(serviceTitle)} Specialists</h2>
        <p>${esc(serviceSummary)} When dealing with hazardous overhanging limbs, hollow trunks, or storm-damaged trees near structures, ISA-certified arborists prioritize safety and property protection.</p>

        <div class="warning-cards-grid">
          <div class="warning-card"><span>⚠️</span> Hazardous Falling Tree &amp; Limb Danger</div>
          <div class="warning-card"><span>⚠️</span> Heavy Storm Damage &amp; Powerline Proximity</div>
          <div class="warning-card"><span>⚠️</span> Fused Cable Snapping &amp; Structural Crack</div>
          <div class="warning-card"><span>⚠️</span> Root Decay &amp; Underground Pipe Intrusion</div>
        </div>

        <h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:800;color:#0d1b2a;margin:32px 0 14px;">Professional Arborist Capabilities</h3>
        <div class="checklist-2col">
          <div class="check-item-line"><span>✔</span> Heavy Crane &amp; Rigging Tree Extraction</div>
          <div class="check-item-line"><span>✔</span> Crown Thinning, Elevating &amp; Structural Pruning</div>
          <div class="check-item-line"><span>✔</span> High-Torque Stump Grinding &amp; Root Ball Removal</div>
          <div class="check-item-line"><span>✔</span> ISA Certified Health &amp; Risk Inspection</div>
          <div class="check-item-line"><span>✔</span> Emergency Storm Clearance &amp; Debris Hauling</div>
          <div class="check-item-line"><span>✔</span> Complete Utility Line &amp; Structure Safety Clearance</div>
        </div>

        <h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:800;color:#0d1b2a;margin:36px 0 16px;">Frequently Asked Questions</h3>
        <details class="faq-item-white">
          <summary>How quickly can an emergency tree crew arrive?</summary>
          <p>We dispatch local certified arborist crews 24/7 across all 50 US states. Emergency response times average under 30 minutes.</p>
        </details>
        <details class="faq-item-white">
          <summary>Do you carry insurance and arborist credentials?</summary>
          <p>Yes! All participating tree crews in our network carry $2M liability insurance, worker's compensation, and ISA arborist certification.</p>
        </details>
      </div>

      <div>
        <div class="white-form-card">
          <h3>Request Free Quote</h3>
          <p>Get best estimate for tree service</p>
          <form action="${PHONE_HREF}" method="GET">
            <div style="margin-bottom:12px;"><input type="text" placeholder="Your Full Name *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <div style="margin-bottom:12px;"><input type="tel" placeholder="Phone Number *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <button type="submit" class="btn-cta" style="width:100%;min-height:50px;">Submit &amp; Call ${PHONE_DISPLAY}</button>
          </form>
        </div>
      </div>
    </div>
  </section>
  </main>`;

  return shell(`${serviceTitle} Guide &amp; Referral Hub | ${BRAND}`, serviceSummary, canonical, body, schema);
}

export function localServicePage(state: StateItem, city: [string, string], service: any, host: string) {
  const [, cityName] = city;
  const canonical = `https://${host}/${service.slug}/`;
  const serviceTitle = service.name || service.title || "Tree Service";
  const serviceSummary = service.description || service.summary || "Local tree service.";
  const regional = getRegionalData(state.code);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${serviceTitle} in ${cityName}, ${state.name}`,
        description: `${serviceSummary} Tailored for ${regional.climateRisk} in ${cityName}, ${state.name}.`,
        provider: { "@type": "Organization", name: BRAND, url: `https://${host}/` },
        areaServed: { "@type": "City", name: cityName }
      }
    ]
  };

  const body = `<main>
  <section class="page-hero">
    <div class="wrap" style="display:grid;grid-template-columns:1fr 380px;gap:44px;align-items:start;">
      <div>
        <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${host}/">${esc(cityName)}</a> / ${esc(serviceTitle)}</div>
        <span class="tag-badge">SAME-DAY LOCAL ARBORIST DISPATCH</span>
        <h1>${esc(serviceTitle)} in <span>${esc(cityName)}, ${esc(state.name)}</span></h1>
        <p style="color:#cbd5e1;font-size:16px;line-height:1.7;">Certified 24/7 emergency tree removal, canopy pruning, and heavy stump grinding in ${esc(cityName)}. Tailored for ${esc(regional.nativeSpecies)}.</p>
        <div style="display:flex;gap:14px;margin-top:24px;">
          <a class="btn-cta" href="${PHONE_HREF}">📞 Call ${PHONE_DISPLAY}</a>
          <a class="btn-glass-cyan" href="https://${DOMAIN}/contact/">Request Quote</a>
        </div>
      </div>
      <div>
        <div class="white-form-card">
          <h3>Request Free Quote</h3>
          <p>Get best estimate for ${esc(cityName)}</p>
          <form action="${PHONE_HREF}" method="GET">
            <div style="margin-bottom:12px;"><input type="text" placeholder="Your Full Name *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <div style="margin-bottom:12px;"><input type="tel" placeholder="Phone Number *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <button type="submit" class="btn-cta" style="width:100%;min-height:50px;">Submit &amp; Call ${PHONE_DISPLAY}</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <section class="sec-gray" style="padding:70px 0;">
    <div class="wrap service-main-grid">
      <div class="service-content-box">
        <span class="tag-badge">LOCAL ${cityName.toUpperCase()} CARE &amp; SAFETY</span>
        <h2>Trusted ${esc(serviceTitle)} in ${esc(cityName)}, ${esc(state.code)}</h2>
        <p>${esc(serviceSummary)} Our ISA-certified arborists provide customized care tailored for ${esc(regional.nativeSpecies)} across ${esc(cityName)} and neighboring communities.</p>

        <div class="warning-cards-grid">
          <div class="warning-card"><span>⚠️</span> ${esc(regional.climateRisk)}</div>
          <div class="warning-card"><span>⚠️</span> ${esc(regional.regulations)}</div>
          <div class="warning-card"><span>⚠️</span> Overhead Power Line Clearance Hazard</div>
          <div class="warning-card"><span>⚠️</span> Fused Cabling &amp; Root Decay Fractures</div>
        </div>

        <h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:800;color:#0d1b2a;margin:32px 0 14px;">${esc(cityName)} Arborist Capabilities</h3>
        <div class="checklist-2col">
          <div class="check-item-line"><span>✔</span> Rapid 30-Minute Local Dispatch</div>
          <div class="check-item-line"><span>✔</span> Heavy Crane &amp; Zero-Clearance Rigging</div>
          <div class="check-item-line"><span>✔</span> Precision Structural Pruning &amp; Thinning</div>
          <div class="check-item-line"><span>✔</span> Hydraulic Stump Grinding &amp; Root Ball Removal</div>
          <div class="check-item-line"><span>✔</span> Multi-Point Safety Risk Assessment</div>
          <div class="check-item-line"><span>✔</span> ${esc(regional.seasonNote)}</div>
        </div>
      </div>

      <div>
        <div class="white-form-card">
          <h3>Request Free Quote</h3>
          <p>Get best estimate for ${esc(cityName)}</p>
          <form action="${PHONE_HREF}" method="GET">
            <div style="margin-bottom:12px;"><input type="text" placeholder="Your Full Name *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <div style="margin-bottom:12px;"><input type="tel" placeholder="Phone Number *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <button type="submit" class="btn-cta" style="width:100%;min-height:50px;">Submit &amp; Call ${PHONE_DISPLAY}</button>
          </form>
        </div>
      </div>
    </div>
  </section>
  </main>`;

  return shell(`${serviceTitle} in ${cityName}, ${state.name} | ${BRAND}`, `24/7 emergency ${serviceTitle.toLowerCase()} in ${cityName}, ${state.name}. Certified local tree care & arborist response.`, canonical, body, schema);
}

export function articlesHubPage() {
  const canonical = `https://${DOMAIN}/articles/`;
  const articleCardsHtml = (articles as any[]).map((art) => `
    <div class="blog-card">
      <img src="https://images.pexels.com/photos/1573894/pexels-photo-1573894.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="${esc(art.title)}" class="blog-card-img" width="400" height="250" loading="lazy" decoding="async">
      <div class="blog-card-body">
        <div>
          <div class="blog-date">July 2026 · By Master Arborist Specialist</div>
          <h3>${esc(art.title)}</h3>
          <p>${esc(art.summary || art.directAnswer || art.excerpt)}</p>
        </div>
        <a href="https://${DOMAIN}/articles/${art.slug}/">Read Master Guide →</a>
      </div>
    </div>
  `).join("");

  const body = `<main>
  <section class="page-hero">
    <div class="wrap">
      <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / Guides</div>
      <span class="tag-badge">ARBORIST TECHNICAL GUIDES</span>
      <h1>Tree Service &amp; Arborist <span>Master Guides</span></h1>
      <p style="color:#cbd5e1;font-size:16px;">Comprehensive technical guides, tree removal procedures, pruning manuals, and risk inspection checklists.</p>
    </div>
  </section>

  <section class="sec-gray" style="padding:70px 0;">
    <div class="wrap">
      <div class="grid-3">${articleCardsHtml}</div>
    </div>
  </section>
  </main>`;

  return shell(`Tree Service Master Guides | ${BRAND}`, "Browse master technical guides on tree removal, pruning, and arborist inspection.", canonical, body);
}

export function articlePage(article: any) {
  const canonical = `https://${DOMAIN}/articles/${article.slug}/`;

  const warningList = (article.warningSigns || []).map((item: string) => `<li style="padding:10px 14px;background:#fff;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:8px;font-size:15px;color:#1e293b;">⚠️ ${esc(item)}</li>`).join("");
  const causesList = (article.commonCauses || []).map((item: string) => `<li style="padding:10px 14px;background:#fff;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:8px;font-size:15px;color:#1e293b;">🔧 ${esc(item)}</li>`).join("");
  const checksList = (article.professionalChecks || []).map((item: string) => `<li style="padding:10px 14px;background:#fff;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:8px;font-size:15px;color:#1e293b;">✔ ${esc(item)}</li>`).join("");
  const preventionList = (article.prevention || []).map((item: string) => `<li style="padding:10px 14px;background:#fff;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:8px;font-size:15px;color:#1e293b;">🛡️ ${esc(item)}</li>`).join("");

  const body = `<main>
  <section class="page-hero">
    <div class="wrap" style="display:grid;grid-template-columns:1fr 380px;gap:44px;align-items:start;">
      <div>
        <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/articles/">Guides</a> / ${esc(article.category || "Arborist Guide")}</div>
        <span class="tag-badge">${esc((article.category || "Tree Care Guide").toUpperCase())}</span>
        <h1>${esc(article.title)}</h1>
        <p style="color:#cbd5e1;font-size:15px;margin-bottom:16px;">Published: July 2026 · Author: Certified Master Arborist</p>
      </div>
      <div>
        <div class="white-form-card">
          <h3>Request Free Quote</h3>
          <p>Get best estimate for tree service</p>
          <form action="${PHONE_HREF}" method="GET">
            <div style="margin-bottom:12px;"><input type="text" placeholder="Your Full Name *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <div style="margin-bottom:12px;"><input type="tel" placeholder="Phone Number *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <button type="submit" class="btn-cta" style="width:100%;min-height:50px;">Submit &amp; Call ${PHONE_DISPLAY}</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <section class="sec-white" style="padding:70px 0;">
    <div class="wrap" style="max-width:920px;">
      ${article.directAnswer ? `
      <div style="background:#f0f9ff;border-left:5px solid #0ea5e9;padding:26px;border-radius:14px;margin-bottom:40px;box-shadow:0 6px 20px rgba(14,165,233,.08);">
        <h3 style="margin:0 0 10px;color:#0369a1;font-size:20px;font-weight:800;">💡 Direct Answer &amp; Quick Summary</h3>
        <p style="margin:0;color:#0c4a6e;font-size:16px;line-height:1.7;">${esc(article.directAnswer)}</p>
      </div>` : ""}

      <div style="margin-bottom:36px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Technical Overview</h2>
        <p style="font-size:16px;line-height:1.8;color:#334155;">${esc(article.summary || article.excerpt)}</p>
      </div>

      ${warningList ? `
      <div style="margin-bottom:36px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">⚠️ Primary Risk Indicators</h2>
        <ul style="list-style:none;padding:0;">${warningList}</ul>
      </div>` : ""}

      ${checksList ? `
      <div style="margin-bottom:36px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">✔ Professional Inspection Checklist</h2>
        <ul style="list-style:none;padding:0;">${checksList}</ul>
      </div>` : ""}

      ${preventionList ? `
      <div style="margin-bottom:36px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">🛡️ Prevention &amp; Maintenance Tips</h2>
        <ul style="list-style:none;padding:0;">${preventionList}</ul>
      </div>` : ""}
    </div>
  </section>
  </main>`;

  return shell(`${article.title} | ${BRAND}`, article.summary || article.directAnswer || article.excerpt, canonical, body);
}

export function servicesHubPage() {
  const canonical = `https://${DOMAIN}/services/`;
  const allServiceCardsHtml = servicesData.map((s: any) => `<div class="service-hub-card"><div><div class="service-hub-icon">🌳</div><h3>${esc(s.name || s.title)}</h3><p>${esc(s.description || s.summary)}</p></div><a href="https://${DOMAIN}/services/${s.slug}/">Review service →</a></div>`).join("");
  const body = `<main><section class="page-hero"><div class="wrap"><h1>Complete Tree Care &amp; Arborist <span>Services Directory</span></h1></div></section><section class="sec-gray" style="padding:70px 0;"><div class="wrap"><div class="grid-3">${allServiceCardsHtml}</div></div></section></main>`;
  return shell(`Tree Care Services Directory | ${BRAND}`, "Browse all tree removal & trimming services.", canonical, body);
}

export function areasWeServePage(states: StateItem[]) {
  const canonical = `https://${DOMAIN}/areas-we-serve/`;
  const stateCardsHtml = states.map((s) => `<a class="dir-card-white" href="https://${s.slug}.${DOMAIN}/"><span>📍 ${esc(s.name)} (${(s.cities || []).length || 60} cities)</span></a>`).join("");
  const body = `<main><section class="page-hero"><div class="wrap"><h1>Tree Care Specialists by <span>State &amp; City</span></h1></div></section><section class="sec-gray" style="padding:70px 0;"><div class="wrap"><div class="dir-grid">${stateCardsHtml}</div></div></section></main>`;
  return shell(`Service Areas | All 50 US States | ${BRAND}`, "Explore 24/7 tree care specialists across all 50 US states.", canonical, body);
}

export function statePage(state: StateItem) {
  const stateSlug = state.slug || state.code.toLowerCase();
  const canonical = `https://${stateSlug}.${DOMAIN}/`;
  const cities = state.cities || [];
  const regional = getRegionalData(state.code);
  const allowedServices = getServicesForState(state.code);

  const cityDirectoryHtml = cities.map(([cSlug, cName]) => `<a class="dir-card-white" href="https://${cSlug}-${stateSlug}.${DOMAIN}/"><span>📍 ${esc(cName)}</span></a>`).join("");
  const stateServicesCards = allowedServices.map((s: any) => `<div class="service-hub-card"><div><div class="service-hub-icon">🌳</div><h3>${esc(s.name || s.title)} in ${esc(state.name)}</h3><p>${esc(s.description || s.summary)}</p></div><a href="https://${DOMAIN}/services/${s.slug}/">Review service →</a></div>`).join("");
  
  const body = `<main><section class="page-hero"><div class="wrap"><h1>Tree Care Services across <span>${esc(state.name)} (${cities.length} Cities)</span></h1><p style="color:#cbd5e1;font-size:16px;">Tailored arborist solutions for ${esc(regional.nativeSpecies)} across ${esc(state.name)}.</p></div></section><section class="sec-gray" style="padding:70px 0;"><div class="wrap"><div style="text-align:center;margin-bottom:32px;"><span class="tag-badge">ALL ${cities.length} CITIES DIRECTORY</span><h2 class="sec-title" style="color:#0d1b2a;">Select Your City in ${esc(state.name)}</h2></div><div class="dir-grid">${cityDirectoryHtml}</div>${mapEmbedHtml(state.name)}</div></section><section class="sec-white" style="padding:70px 0;"><div class="wrap"><div class="grid-3">${stateServicesCards}</div></div></section></main>`;
  return shell(`Tree Care Services across ${state.name} (${cities.length} Cities) | ${BRAND}`, `24/7 tree removal & trimming across all ${cities.length} cities in ${state.name}. Tailored for ${regional.climateRisk}.`, canonical, body);
}

export function cityPage(state: StateItem, city: [string, string], host: string) {
  const [, cityName] = city;
  const stateSlug = state.slug || state.code.toLowerCase();
  const canonical = `https://${host}/`;
  const regional = getRegionalData(state.code);
  const allowedServices = getServicesForState(state.code);

  const nearbyCities = (state.cities || []).filter(([cSlug]) => cSlug !== city[0]).slice(0, 8);
  const nearbyCardsHtml = nearbyCities.map(([cSlug, cName]) => `<a class="dir-card-white" href="https://${cSlug}-${stateSlug}.${DOMAIN}/"><span>📍 ${esc(cName)}</span></a>`).join("");
  const allServicesDirectoryHtml = allowedServices.map((s: any) => `<div class="service-hub-card"><div><div class="service-hub-icon">🌳</div><h3>${esc(s.name || s.title)} in ${esc(cityName)}</h3><p>${esc(s.description || s.summary)}</p></div><a href="https://${host}/${s.slug}/">Review service →</a></div>`).join("");
  
  const body = `<main><section class="page-hero"><div class="wrap"><h1>24/7 Tree Care in <span>${esc(cityName)}, ${esc(state.name)}</span></h1><p style="color:#cbd5e1;font-size:16px;">Certified local arborist dispatch for ${esc(regional.nativeSpecies)} in ${esc(cityName)}.</p></div></section><section class="sec-gray" style="padding:60px 0;"><div class="wrap"><div class="dir-grid">${nearbyCardsHtml}</div>${mapEmbedHtml(cityName + ", " + state.name)}</div></section><section class="sec-white" style="padding:70px 0;"><div class="wrap"><div class="grid-3">${allServicesDirectoryHtml}</div></div></section></main>`;
  return shell(`24/7 Tree Care in ${cityName}, ${state.name} | ${BRAND}`, `24/7 local arborist & tree removal in ${cityName}, ${state.name}. Customized for ${regional.climateRisk}.`, canonical, body);
}

export function homePage(states: StateItem[]) {
  const canonical = `https://${DOMAIN}/`;
  const statePills = states.map(s => `<a class="dir-card-white" href="https://${s.slug}.${DOMAIN}/"><span>📍 ${esc(s.name)}</span></a>`).join("");
  const topServicesCards = servicesData.slice(0, 6).map((s: any) => `<div class="service-hub-card"><div><div class="service-hub-icon">🌳</div><h3>${esc(s.name || s.title)}</h3><p>${esc(s.description || s.summary)}</p></div><a href="https://${DOMAIN}/services/${s.slug}/">Read More →</a></div>`).join("");

  const blogCardsHtml = (articles as any[]).slice(0, 3).map((art) => `
    <div class="blog-card">
      <img src="https://images.pexels.com/photos/1573894/pexels-photo-1573894.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="${esc(art.title)}" class="blog-card-img" width="400" height="250" loading="lazy" decoding="async">
      <div class="blog-card-body">
        <div>
          <div class="blog-date">July 2026 · By Master Arborist Specialist</div>
          <h3>${esc(art.title)}</h3>
          <p>${esc(art.summary || art.directAnswer || art.excerpt)}</p>
        </div>
        <a href="https://${DOMAIN}/articles/${art.slug}/">Read Master Guide →</a>
      </div>
    </div>
  `).join("");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `https://${DOMAIN}/#organization`,
        name: BRAND,
        url: canonical,
        telephone: PHONE_DISPLAY,
        address: {
          "@type": "PostalAddress",
          streetAddress: "350 N High St",
          addressLocality: "Columbus",
          addressRegion: "OH",
          postalCode: "43215",
          addressCountry: "US"
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "17200",
          bestRating: "5"
        },
        areaServed: { "@type": "Country", name: "United States" },
        priceRange: "$$"
      },
      {
        "@type": "WebSite",
        name: BRAND,
        url: canonical
      }
    ]
  };

  const body = `<main>
  <section class="page-hero">
    <div class="wrap" style="display:grid;grid-template-columns:1fr 380px;gap:44px;align-items:start;">
      <div>
        <span class="tag-badge" style="background:rgba(14,165,233,.18);color:#38bdf8;">24/7 NATIONWIDE EMERGENCY DISPATCH</span>
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(38px,5vw,56px);font-weight:900;color:#fff;line-height:1.1;margin:16px 0 14px;">
          Emergency Tree Removal &amp; Trimming <span style="color:#38bdf8;">Nationwide Across USA</span>
        </h1>
        <p style="font-size:16px;line-height:1.7;color:#cbd5e1;margin-bottom:24px;">ISA-certified arborists providing 24/7 emergency tree removal, crane rigging, storm damage clearance, and stump grinding across all 50 US states.</p>
        <div style="display:flex;gap:14px;"><a class="btn-cta" href="${PHONE_HREF}">📞 Call ${PHONE_DISPLAY}</a><a class="btn-glass-cyan" href="https://${DOMAIN}/contact/">Request Free Quote</a></div>
      </div>
      <div>
        <div class="white-form-card">
          <h3>Request Free Quote</h3>
          <p>Get best estimate for 24/7 certified tree service</p>
          <form action="${PHONE_HREF}" method="GET">
            <div style="margin-bottom:12px;"><input type="text" placeholder="Your Full Name *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <div style="margin-bottom:12px;"><input type="tel" placeholder="Phone Number *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <button type="submit" class="btn-cta" style="width:100%;min-height:50px;">Get Estimate Now →</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <section class="stats-bar">
    <div class="wrap stats-grid">
      <div class="stat-item"><h3>50 States</h3><p>Nationwide Coverage</p></div>
      <div class="stat-item"><h3>30,900+</h3><p>Cities Served</p></div>
      <div class="stat-item"><h3>30 Mins</h3><p>Emergency Dispatch</p></div>
      <div class="stat-item"><h3>4.9 ★</h3><p>17,200+ Verified Reviews</p></div>
    </div>
  </section>

  <section class="sec-gray" style="padding:70px 0;">
    <div class="wrap">
      <div style="text-align:center;margin-bottom:44px;">
        <span class="tag-badge">OUR SERVICES</span>
        <h2 class="sec-title" style="color:#0d1b2a;">Certified Tree Care Services</h2>
      </div>
      <div class="grid-3">${topServicesCards}</div>
      <div style="text-align:center;margin-top:36px;"><a href="https://${DOMAIN}/services/" class="btn-cta">View All Services →</a></div>
    </div>
  </section>

  <section class="sec-white" style="padding:70px 0;">
    <div class="wrap">
      <div style="text-align:center;margin-bottom:44px;">
        <span class="tag-badge">FROM OUR BLOG</span>
        <h2 class="sec-title" style="color:#0d1b2a;">Tree Service Guides &amp; Resources</h2>
      </div>
      <div class="grid-3">${blogCardsHtml}</div>
      <div style="text-align:center;margin-top:40px;">
        <a href="https://${DOMAIN}/articles/" class="btn-dark-navy" style="font-size:16px;padding:16px 32px;">Explore All Technical Master Guides →</a>
      </div>
    </div>
  </section>

  <section class="sec-gray" style="padding:70px 0;">
    <div class="wrap">
      <div style="text-align:center;margin-bottom:44px;">
        <span class="tag-badge">SERVICE AREAS</span>
        <h2 class="sec-title" style="color:#0d1b2a;">Explore All 50 US States</h2>
      </div>
      <div class="dir-grid">${statePills}</div>
    </div>
  </section>
  </main>`;

  return shell(`Can Tree Service: Certified Tree Removal &amp; Arborist Services Nationwide Across USA`, "24/7 emergency tree removal &amp; trimming across all 50 US states.", canonical, body, schema);
}

export function infoPage(title: string, contentHtml: string, canonical: string) {
  const body = `<main><section class="page-hero"><div class="wrap"><h1>${esc(title)}</h1></div></section><section class="sec-white" style="padding:70px 0;"><div class="wrap" style="max-width:850px;font-size:16px;line-height:1.75;color:#334155;">${contentHtml}</div></section></main>`;
  return shell(`${title} | ${BRAND}`, title, canonical, body);
}

export function aboutUsPage() {
  return infoPage("About Can Tree Service", "<p>Can Tree Service is a nationwide certified arborist and emergency tree care referral network operating across all 50 US states.</p>", `https://${DOMAIN}/about/`);
}

export function contactUsPage() {
  return infoPage("Contact Can Tree Service", `<p>Call us 24/7 at <strong>${PHONE_DISPLAY}</strong> or email <strong>dispatch@${DOMAIN}</strong>.</p>`, `https://${DOMAIN}/contact/`);
}

export function privacyPolicyPage() {
  return infoPage("Privacy Policy", "<p>Your privacy is important to us. Learn how we handle customer data and emergency lead routing.</p>", `https://${DOMAIN}/privacy-policy/`);
}

export function termsOfServicePage() {
  return infoPage("Terms of Service", "<p>Terms of service and referral network disclosures for Can Tree Service.</p>", `https://${DOMAIN}/terms/`);
}

export function disclaimerPage() {
  return infoPage("Disclaimer", "<p>Can Tree Service is an independent referral network connecting homeowners with local licensed tree specialists.</p>", `https://${DOMAIN}/disclaimer/`);
}

export function notFoundPage(message = "Page Not Found") {
  const body = `<main><section class="page-hero"><div class="wrap"><h1>404 — ${esc(message)}</h1><p style="color:#cbd5e1;font-size:16px;">The requested page could not be found.</p><a href="https://${DOMAIN}/" class="btn-cta" style="margin-top:20px;">Back to Homepage →</a></div></section></main>`;
  return shell(`404 Page Not Found | ${BRAND}`, "Page Not Found", `https://${DOMAIN}/404`, body);
}
