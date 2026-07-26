import services from "../data/services.json";
import articles from "../data/articles.json";
import type { StateItem } from "./sitemaps";
import { SITE } from "../lib/site";

const DOMAIN = SITE.domain;
const PHONE_DISPLAY = SITE.phoneDisplay;
const PHONE_HREF = SITE.phoneHref;

const IMAGES = {
  hero: "https://images.pexels.com/photos/34859642/pexels-photo-34859642.jpeg?auto=compress&cs=tinysrgb&w=1600",
  state: "https://images.pexels.com/photos/34859642/pexels-photo-34859642.jpeg?auto=compress&cs=tinysrgb&w=1600",
  city: "https://images.pexels.com/photos/28384143/pexels-photo-28384143.jpeg?auto=compress&cs=tinysrgb&w=1600",
  service: "https://images.pexels.com/photos/34711989/pexels-photo-34711989.jpeg?auto=compress&cs=tinysrgb&w=1600",
};

const CSS = `
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#fff;color:#172033;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;-webkit-font-smoothing:antialiased}a{color:inherit;text-decoration:none}.wrap{width:min(1180px,calc(100% - 32px));margin:auto}.top{background:#063a2c;color:#dbe7f5;font-size:12px}.top .wrap,.nav .wrap{display:flex;align-items:center;justify-content:space-between;gap:20px}.top .wrap{padding:9px 0}.top b{color:#d97706}.nav{position:sticky;top:0;z-index:30;background:rgba(255,255,255,.97);backdrop-filter:blur(14px);border-bottom:1px solid #dfe6ee;box-shadow:0 10px 32px rgba(16,24,38,.08)}.nav .wrap{padding:14px 0}.brand{display:flex;align-items:center;gap:11px;font-size:20px;font-weight:950;color:#101826;letter-spacing:-.02em}.logo{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(135deg,#059669,#047857);color:#fff;box-shadow:0 10px 24px rgba(5,150,105,.25);font-size:20px;font-weight:900}.brand small{display:block;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#6c7a8b}.links{display:flex;gap:22px;font-size:14px;font-weight:850}.links a:hover{color:#059669}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:14px 21px;border-radius:10px;background:#d97706;color:#fff;font-weight:900;box-shadow:0 10px 24px rgba(217,119,6,.24);transition:.2s;border:none;cursor:pointer}.btn:hover{transform:translateY(-2px);background:#b45309}.btn.dark{background:#063a2c}.btn.ghost{background:transparent;border:1px solid rgba(255,255,255,.38);box-shadow:none}.hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#042f2e 0%,#064e3b 58%,#059669 100%);color:#fff;padding:78px 0}.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:48px;align-items:center}.hero h1{font-size:clamp(40px,5.5vw,64px);line-height:1.05;letter-spacing:-.04em;margin:18px 0}.hero h1 em{font-style:normal;color:#6ee7b7}.hero p{font-size:17px;line-height:1.75;color:#d6e2ee;max-width:760px}.form-card{background:#fff;color:#0f172a;border-radius:22px;padding:28px;box-shadow:0 24px 60px rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.2)}.form-card h2{font-size:22px;font-weight:900;margin:0 0 6px;color:#101826}.form-card p{font-size:13px;color:#64748b;margin:0 0 20px}.form-group{margin-bottom:14px}.form-group input,.form-group select,.form-group textarea{width:100%;padding:13px 16px;border-radius:10px;border:1px solid #cbd5e1;font-size:14px;outline:none;background:#f8fafc}.form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:#059669;background:#fff;box-shadow:0 0 0 3px rgba(5,150,105,.2)}.rating-badge{display:inline-flex;align-items:center;gap:10px;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);font-size:13px;font-weight:800;color:#fff;margin-top:16px}.stars{color:#f59e0b;letter-spacing:2px}.crumb{font-size:13px;color:#b7cad9}.crumb a{color:#a7f3d0}.eyebrow{display:inline-flex;padding:8px 12px;border-radius:999px;background:rgba(5,150,105,.2);border:1px solid rgba(110,231,183,.4);color:#a7f3d0;font-size:11px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}.buttons{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}.stats{border-bottom:1px solid #dfe6ee;background:#fff}.stats .wrap{display:grid;grid-template-columns:repeat(4,1fr)}.stat{text-align:center;padding:27px 15px;border-left:1px solid #dfe6ee}.stat:first-child{border-left:0}.stat strong{display:block;font-size:31px;color:#064e3b}.stat span{display:block;margin-top:5px;color:#778495;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.1em}.section{padding:78px 0}.soft{background:#f0fdf4}.blue{background:#ecfdf5}.dark-section{background:#042f2e;color:#fff}.head{display:flex;align-items:end;justify-content:space-between;gap:28px;margin-bottom:32px}.eyeline{display:inline-block;color:#059669;font-size:11px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}.section h2{font-size:clamp(34px,4vw,50px);line-height:1.08;margin:8px 0 0;letter-spacing:-.038em}.muted{max-width:760px;color:#667486;line-height:1.75}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.card{display:block;background:#fff;border:1px solid #dfe6ee;border-radius:18px;padding:25px;box-shadow:0 8px 26px rgba(16,24,38,.06);transition:.2s}.card:hover{transform:translateY(-4px);border-color:#34d399;box-shadow:0 18px 40px rgba(16,24,38,.12)}.card b{display:grid;place-items:center;width:46px;height:46px;border-radius:13px;background:#d1fae5;color:#059669;font-size:14px}.card h3{font-size:20px;margin:17px 0 9px;color:#101826;letter-spacing:-.02em}.card p{color:#667486;line-height:1.68;margin:0;font-size:14px}.more{display:inline-block;margin-top:17px;color:#059669;font-weight:900;font-size:14px}.directory{display:grid;grid-template-columns:repeat(4,1fr);gap:13px}.directory a{display:flex;align-items:center;justify-content:space-between;gap:15px;padding:17px 18px;border:1px solid #dfe6ee;border-radius:13px;background:#fff;color:#344054;font-size:14px;font-weight:850;box-shadow:0 6px 18px rgba(16,24,38,.04);transition:.18s}.directory a:after{content:"→";color:#059669}.directory a:hover{transform:translateY(-2px);color:#059669;border-color:#34d399}.zip-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.zip-card{background:#fff;border:1px solid #dfe6ee;border-radius:14px;padding:18px;text-align:center;box-shadow:0 6px 18px rgba(16,24,38,.04);transition:.18s}.zip-card:hover{transform:translateY(-3px);border-color:#059669;box-shadow:0 12px 30px rgba(5,150,105,.2)}.zip-card span{display:block;font-size:20px;margin-bottom:6px}.zip-card strong{display:block;font-size:16px;color:#101826}.zip-card small{display:block;font-size:12px;color:#667486;margin-top:4px;font-weight:700}.checklist{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:20px}.check-item{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:700;color:#1e293b}.check-item span{color:#059669;font-size:16px}.content{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:40px}.article{font-size:17px;line-height:1.82}.article h2{font-size:30px;color:#101826;margin-top:40px;letter-spacing:-.025em}.article h3{font-size:21px;color:#101826}.article p,.article li{color:#5e6d7e}.article li{margin:8px 0}.side{position:sticky;top:105px;align-self:start;background:linear-gradient(145deg,#042f2e,#064e3b);color:#fff;border-radius:19px;padding:27px;box-shadow:0 18px 45px rgba(16,24,38,.2)}.side p{color:#d5e2ee;line-height:1.65}.side .more{display:block;color:#a7f3d0}.notice{background:#fff7ed;border:1px solid #fed7aa;border-radius:14px;padding:19px;color:#9a3412;line-height:1.65}.process{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:34px}.step{background:#fff;border:1px solid #dfe6ee;border-radius:16px;padding:23px}.step b{font-size:35px;color:#dce7ef}.step h3{font-size:20px;color:#101826}.step p{color:#667486;line-height:1.65}.faq{display:grid;gap:12px;margin-top:28px}.faq details{background:#fff;border:1px solid #dfe6ee;border-radius:13px;padding:18px 20px}.faq summary{cursor:pointer;font-weight:900;color:#101826}.faq p{color:#667486;line-height:1.7}.footer{background:#042f2e;color:#aebdca;padding:54px 0 22px}.footer .wrap{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:36px}.footer h3{color:#fff}.footer a{display:block;margin:10px 0}.legal{grid-column:1/-1;border-top:1px solid rgba(255,255,255,.1);padding-top:20px;font-size:12px}.sticky{position:fixed;right:18px;bottom:18px;z-index:80}@media(max-width:920px){.links{display:none}.hero-grid,.content{grid-template-columns:1fr}.hero-photo img{height:420px}.grid,.zip-grid,.checklist{grid-template-columns:repeat(2,1fr)}.directory{grid-template-columns:repeat(2,1fr)}.process{grid-template-columns:repeat(2,1fr)}.side{position:static}.footer .wrap{grid-template-columns:1fr 1fr}}@media(max-width:620px){.top span:last-child{display:none}.hero{padding:58px 0}.hero h1{font-size:38px}.hero-photo img{height:360px}.grid,.directory,.process,.zip-grid,.checklist,.footer .wrap{grid-template-columns:1fr}.stats .wrap{grid-template-columns:1fr 1fr}.stat:nth-child(3){border-left:0;border-top:1px solid #dfe6ee}.stat:nth-child(4){border-top:1px solid #dfe6ee}.head{display:block}.btn{width:100%}.sticky{left:12px;right:12px;bottom:12px}}
`;

function esc(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] || char);
}

function header() {
  return `<div class="top"><div class="wrap"><span>● &nbsp; Nationwide certified arborist information and tree service provider directory</span><span><b>Independent provider network</b> &nbsp; | &nbsp; Call ${PHONE_DISPLAY}</span></div></div><header class="nav"><div class="wrap"><a class="brand" href="https://${DOMAIN}/"><span class="logo">CT</span><span>${SITE.name}<small>Tree Removal · Trimming · Stump Grinding</small></span></a><nav class="links"><a href="https://${DOMAIN}/services/">Services</a><a href="https://${DOMAIN}/areas-we-serve/">Areas We Serve</a><a href="https://${DOMAIN}/articles/">Arborist Guides</a><a href="https://${DOMAIN}/about/">About</a><a href="https://${DOMAIN}/contact/">Contact</a></nav><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></header>`;
}

function footer() {
  return `<footer class="footer"><div class="wrap"><div><h3>${SITE.name}</h3><p>Research tree care topics, emergency removal guidelines, and arborist services across all 50 states.</p><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div><div><h3>Explore</h3><a href="https://${DOMAIN}/services/">All ${services.length} Services</a><a href="https://${DOMAIN}/areas-we-serve/">States &amp; Cities</a><a href="https://${DOMAIN}/articles/">Arborist Guides</a><a href="https://${DOMAIN}/about/">About</a></div><div><h3>Disclosure</h3><a href="https://${DOMAIN}/provider-disclosure/">Provider Disclosure</a><a href="https://${DOMAIN}/privacy-policy/">Privacy Policy</a><a href="https://${DOMAIN}/terms/">Terms</a><a href="https://${DOMAIN}/disclaimer/">Disclaimer</a><a href="https://${DOMAIN}/accessibility/">Accessibility</a></div><div class="legal">© ${new Date().getUTCFullYear()} ${SITE.name}. This website is an information and referral platform. Providers are independent businesses. Verify current coverage, legal identity, credentials, insurance, scope, pricing and warranties before hiring.</div></div></footer>`;
}

function leadFormHtml(locationTitle: string) {
  return `<div class="form-card"><h2>Request Free Tree Quote</h2><p>Get best estimate for certified tree care in ${esc(locationTitle)}</p><form action="${PHONE_HREF}" method="GET"><div class="form-group"><input type="text" placeholder="Your Full Name *" required></div><div class="form-group"><input type="tel" placeholder="Phone Number *" required></div><div class="form-group"><select required><option value="">Select Service Needed *</option><option>Emergency Tree Removal</option><option>Tree Trimming &amp; Pruning</option><option>Stump Grinding &amp; Removal</option><option>Hazard Tree Inspection</option><option>Storm Damage Clearance</option><option>Land &amp; Lot Clearing</option></select></div><div class="form-group"><textarea rows="2" placeholder="Describe tree size or property details..."></textarea></div><button type="submit" class="btn" style="width:100%">Submit &amp; Call ${PHONE_DISPLAY}</button></form></div>`;
}

function trustChecklistHtml() {
  return `<div class="checklist"><div class="check-item"><span>✔</span> Upfront &amp; Competitive Tree Estimates</div><div class="check-item"><span>✔</span> Certified Arborists &amp; Licensed Crews</div><div class="check-item"><span>✔</span> Knowledge of Local Streets &amp; Hazards</div><div class="check-item"><span>✔</span> 24/7 Emergency Storm Damage Line</div><div class="check-item"><span>✔</span> Heavy Removal &amp; Crane Operations</div><div class="check-item"><span>✔</span> 100% Property Protection Commitment</div></div>`;
}

function shell(title: string, description: string, canonical: string, body: string, schema: unknown) {
  return `<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | ${SITE.name}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonical}"><meta name="robots" content="index,follow"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><style>${CSS}</style><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script></head><body>${header()}${body}${footer()}<a class="btn sticky" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></body></html>`;
}

function serviceCards(host: string, local: boolean) {
  return services.map((service, index) => `<a class="card" href="${local ? `https://${host}/${service.slug}/` : `https://${DOMAIN}/services/${service.slug}/`}"><b>${String(index + 1).padStart(2, "0")}</b><h3>${esc(service.name)}</h3><p>${esc(service.description)}</p><span class="more">Review service →</span></a>`).join("");
}

export function homePage(states: StateItem[]) {
  const canonical = `https://${DOMAIN}/`;
  const stateLinks = states.map((s) => `<a href="https://${s.slug}.${DOMAIN}/"><span>${esc(s.name)}</span></a>`).join("");
  const offerCatalog = {
    "@type": "OfferCatalog",
    name: "Nationwide Certified Tree Removal & Arborist Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        url: `https://${DOMAIN}/services/${s.slug}/`
      }
    }))
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TreeService",
        "@id": `https://${DOMAIN}/#organization`,
        name: SITE.name,
        url: canonical,
        telephone: PHONE_DISPLAY,
        hasOfferCatalog: offerCatalog
      },
      {
        "@type": "WebSite",
        name: SITE.name,
        url: canonical
      }
    ]
  };

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><span class="eyebrow">Nationwide tree service directory</span><h1>24/7 Certified Tree Service <em>In Your City</em></h1><p>Research tree removal, trimming, stump grinding, and connect with independent arborist professionals across all 50 states.</p><div class="rating-badge"><span class="stars">★★★★★</span><span>Rated 4.9/5 by 17,200+ Property Owners</span></div>${trustChecklistHtml()}<div class="buttons"><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a><a class="btn ghost" href="#services">View ${services.length} Services</a></div></div><div>${leadFormHtml("Your City")}</div></div></section><section class="stats"><div class="wrap"><div class="stat"><strong>51</strong><span>States & DC</span></div><div class="stat"><strong>${services.length}</strong><span>Tree topics</span></div><div class="stat"><strong>City</strong><span>Local Subdomains</span></div><div class="stat"><strong>Direct</strong><span>Arborist Check</span></div></div></section><section class="section soft" id="states"><div class="wrap"><div class="head"><div><span class="eyeline">Areas We Serve</span><h2>Tree service directory by state</h2><p class="muted">Select your state to explore local cities and communities.</p></div></div><div class="directory">${stateLinks}</div></div></section><section class="section" id="services"><div class="wrap"><div class="head"><div><span class="eyeline">Services Directory</span><h2>All ${services.length} tree care services</h2><p class="muted">Review tree removal, trimming, pruning, stump grinding, emergency storm cleanup, cabling, and land clearing.</p></div></div><div class="grid">${serviceCards(DOMAIN, false)}</div></div></section></main>`;
  return shell("Certified Tree Removal & Arborist Services Directory", "Nationwide certified arborist and tree service referral directory across all 50 US states.", canonical, body, schema);
}

export function servicesHubPage() {
  const canonical = `https://${DOMAIN}/services/`;
  const offerCatalog = {
    "@type": "OfferCatalog",
    name: "Nationwide Certified Tree Removal & Arborist Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        url: `https://${DOMAIN}/services/${s.slug}/`
      }
    }))
  };
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "All Tree Removal & Arborist Services",
        url: canonical,
        hasOfferCatalog: offerCatalog
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${DOMAIN}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: canonical }
        ]
      }
    ]
  };
  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${DOMAIN}/">Home</a> / Services</div><span class="eyebrow">National Service Hub</span><h1>Tree removal &amp; arborist <em>services</em></h1><p>Browse our complete catalog of ${services.length} tree removal, trimming, stump grinding, storm clearance, cabling, and hazard inspection topics.</p><div class="buttons"><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div>${leadFormHtml("United States")}</div></div></section><section class="section"><div class="wrap"><div class="head"><div><span class="eyeline">Complete Directory</span><h2>All ${services.length} Service Topics</h2></div></div><div class="grid">${serviceCards(DOMAIN, false)}</div></div></section></main>`;
  return shell("All Certified Tree Services Directory", `Browse all ${services.length} tree removal and arborist services across the United States.`, canonical, body, schema);
}

export function nationalServicePage(service: (typeof services)[number]) {
  const canonical = `https://${DOMAIN}/services/${service.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: canonical,
        provider: { "@type": "Organization", name: SITE.name, url: `https://${DOMAIN}/` }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${DOMAIN}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `https://${DOMAIN}/services/` },
          { "@type": "ListItem", position: 3, name: service.name, item: canonical }
        ]
      }
    ]
  };
  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/services/">Services</a> / ${esc(service.name)}</div><span class="eyebrow">Tree Service Guide</span><h1>${esc(service.name)} <em>Guide & Service Directory</em></h1><p>${esc(service.description)} Review warning signs, safety considerations, and local provider options.</p><div class="buttons"><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a><a class="btn ghost" href="https://${DOMAIN}/areas-we-serve/">Find Local Arborist</a></div></div><div>${leadFormHtml(service.name)}</div></div></section><section class="section content"><div class="wrap article"><span class="eyeline">Service Overview</span><h2>About ${esc(service.name)}</h2><p>${esc(service.description)} Always start with an on-site assessment before authorizing heavy equipment or tree climbing operations.</p></div></section></main>`;
  return shell(`${service.name} - ${SITE.name}`, service.description, canonical, body, schema);
}

export function areasWeServePage(states: StateItem[]) {
  const canonical = `https://${DOMAIN}/areas-we-serve/`;
  const stateLinks = states.map((s) => `<a href="https://${s.slug}.${DOMAIN}/"><span>${esc(s.name)} (${s.cities.length} cities)</span></a>`).join("");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Areas We Serve - State & City Tree Service Directories",
        url: canonical
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${DOMAIN}/` },
          { "@type": "ListItem", position: 2, name: "Areas We Serve", item: canonical }
        ]
      }
    ]
  };
  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${DOMAIN}/">Home</a> / Areas We Serve</div><span class="eyebrow">Location Directory</span><h1>Tree service locations by <em>State & City</em></h1><p>Select your state below to explore city subdomains and local independent certified arborist providers.</p><div class="buttons"><a class="btn" href="#states">Browse States</a></div></div><div>${leadFormHtml("United States")}</div></div></section><section class="section soft" id="states"><div class="wrap"><div class="directory">${stateLinks}</div></div></section></main>`;
  return shell("Areas We Serve - State & City Tree Service Directory", "Browse tree service locations across all 50 US states and thousands of local cities.", canonical, body, schema);
}

export function articlesHubPage() {
  const canonical = `https://${DOMAIN}/articles/`;
  const articleCards = articles.map((article: any) => `<a class="card" href="https://${DOMAIN}/articles/${article.slug}/"><h3>${esc(article.title)}</h3><p>${esc(article.excerpt || article.description || "")}</p><span class="more">Read guide →</span></a>`).join("");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Arborist Guides & Tree Care Articles",
        url: canonical
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${DOMAIN}/` },
          { "@type": "ListItem", position: 2, name: "Articles", item: canonical }
        ]
      }
    ]
  };
  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${DOMAIN}/">Home</a> / Articles</div><span class="eyebrow">Arborist Advice</span><h1>Tree care <em>guides &amp; safety tips</em></h1><p>Learn how to inspect hazard trees, manage storm risk, prune oak and pine trees, and hire certified arborists safely.</p><div class="buttons"><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div>${leadFormHtml("Tree Advice")}</div></div></section><section class="section"><div class="wrap"><div class="grid">${articleCards}</div></div></section></main>`;
  return shell("Arborist Guides & Tree Care Articles", "Browse expert tree removal guides, storm damage risk assessment, and pruning safety tips.", canonical, body, schema);
}

export function articlePage(article: any) {
  const canonical = `https://${DOMAIN}/articles/${article.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.excerpt || article.description || "",
        url: canonical,
        publisher: { "@type": "Organization", name: SITE.name, url: `https://${DOMAIN}/` }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${DOMAIN}/` },
          { "@type": "ListItem", position: 2, name: "Articles", item: `https://${DOMAIN}/articles/` },
          { "@type": "ListItem", position: 3, name: article.title, item: canonical }
        ]
      }
    ]
  };
  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/articles/">Articles</a> / ${esc(article.title)}</div><span class="eyebrow">Tree Care Guide</span><h1>${esc(article.title)}</h1><p>${esc(article.excerpt || article.description || "")}</p><div class="buttons"><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div>${leadFormHtml(article.title)}</div></div></section><section class="section content"><div class="wrap article"><span class="eyeline">Expert Guide</span><h2>Overview</h2><p>${esc(article.excerpt || article.description || "")}</p></div></section></main>`;
  return shell(`${article.title} - ${SITE.name}`, article.excerpt || article.description || "", canonical, body, schema);
}

export function infoPage(title: string, content: string, path: string) {
  const canonical = `https://${DOMAIN}${path}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: title,
        url: canonical
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${DOMAIN}/` },
          { "@type": "ListItem", position: 2, name: title, item: canonical }
        ]
      }
    ]
  };
  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${DOMAIN}/">Home</a> / ${esc(title)}</div><span class="eyebrow">Information</span><h1>${esc(title)}</h1></div><div>${leadFormHtml(title)}</div></div></section><section class="section content"><div class="wrap article">${content}</div></section></main>`;
  return shell(`${title} | ${SITE.name}`, `${title} page on ${SITE.name}.`, canonical, body, schema);
}

export function statePage(state: StateItem, host: string) {
  const cityLinks = state.cities.map(([slug, name]) => `<a href="https://${slug}-${state.slug}.${DOMAIN}/"><span>${esc(name)}</span></a>`).join("");
  const canonical = `https://${host}/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `Tree Services in ${state.name}`,
        url: canonical,
        about: { "@type": "State", name: state.name },
        isPartOf: { "@type": "WebSite", name: SITE.name, url: `https://${DOMAIN}/` }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Areas We Serve", item: `https://${DOMAIN}/areas-we-serve/` },
          { "@type": "ListItem", position: 2, name: state.name, item: canonical }
        ]
      }
    ]
  };
  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/areas-we-serve/">Areas We Serve</a> / ${esc(state.name)}</div><span class="eyebrow">${state.code.toUpperCase()} tree service directory</span><h1>Tree services across <em>${esc(state.name)}</em></h1><p>Choose a city or community, review the complete ${services.length}-service directory and prepare for a consultation with an independent arborist in ${esc(state.name)}.</p><div class="rating-badge"><span class="stars">★★★★★</span><span>Top-Rated ${state.name} Arborist Network</span></div>${trustChecklistHtml()}<div class="buttons"><a class="btn" href="#cities">Browse ${state.cities.length.toLocaleString()} Cities</a><a class="btn ghost" href="#services">View All Services</a></div></div><div>${leadFormHtml(state.name)}</div></div></section><section class="stats"><div class="wrap"><div class="stat"><strong>${services.length}</strong><span>Tree topics</span></div><div class="stat"><strong>${state.cities.length.toLocaleString()}</strong><span>Cities & communities</span></div><div class="stat"><strong>${state.code.toUpperCase()}</strong><span>State directory</span></div><div class="stat"><strong>Direct</strong><span>Arborist verification</span></div></div></section><section class="section soft" id="cities"><div class="wrap"><div class="head"><div><span class="eyeline">Areas we serve</span><h2>Tree service locations in ${esc(state.name)}</h2><p class="muted">Select a city to open its local service hub.</p></div></div><div class="directory">${cityLinks}</div></div></section><section class="section" id="services"><div class="wrap"><div class="head"><div><span class="eyeline">Complete service directory</span><h2>All ${services.length} tree services</h2><p class="muted">Review tree removal, trimming, pruning, stump grinding, cabling, storm clearance, and land clearing topics.</p></div><a class="btn dark" href="https://${DOMAIN}/services/">National Service Hub</a></div><div class="grid">${serviceCards(host, false)}</div></div></section></main>`;
  return shell(`Tree Services in ${state.name}`, `Browse ${services.length} tree care services and ${state.cities.length} city routes in ${state.name}.`, canonical, body, schema);
}

export function cityPage(state: StateItem, city: [string, string], host: string) {
  const [, cityName] = city;
  const canonical = `https://${host}/`;

  const offerCatalog = {
    "@type": "OfferCatalog",
    name: `Tree Services in ${cityName}, ${state.name}`,
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${s.name} in ${cityName}`,
        description: s.description,
        url: `https://${host}/${s.slug}/`
      }
    }))
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TreeService",
        "@id": `${canonical}#business`,
        name: `${SITE.name} ${cityName}`,
        url: canonical,
        telephone: PHONE_DISPLAY,
        address: {
          "@type": "PostalAddress",
          addressLocality: cityName,
          addressRegion: state.code.toUpperCase(),
          addressCountry: "US"
        },
        priceRange: "$$",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59"
          }
        ],
        hasOfferCatalog: offerCatalog
      },
      {
        "@type": "Product",
        name: `Tree Services in ${cityName}, ${state.name}`,
        description: `24/7 Emergency tree removal, trimming, stump grinding in ${cityName}, ${state.name}.`,
        url: canonical,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "172"
        }
      },
      {
        "@type": "HowTo",
        name: `How to book Tree Service in ${cityName}?`,
        description: `Follow these steps to schedule tree removal or arborist service in ${cityName}, ${state.name}:`,
        step: [
          { "@type": "HowToStep", name: "Step 1: Initiate Request", text: `Call ${PHONE_DISPLAY} or submit the quote form.` },
          { "@type": "HowToStep", name: "Step 2: Provide Details", text: "Describe tree issue, hazard urgency, proximity to power lines or structures." },
          { "@type": "HowToStep", name: "Step 3: Connect Arborist", text: `Our network matches you with a trained local ${cityName} certified tree crew.` },
          { "@type": "HowToStep", name: "Step 4: On-Site Inspection", text: "Arborists conduct thorough hazard and rigging assessment." },
          { "@type": "HowToStep", name: "Step 5: Safe Removal & Cleanup", text: "Execute tree removal/trimming with full property protection and stump grinding." }
        ]
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `What are your hours of operation in ${cityName}?`,
            acceptedAnswer: { "@type": "Answer", text: `Our ${cityName} certified tree crews operate 24/7 for emergency storm damage and hazardous tree removal.` }
          },
          {
            "@type": "Question",
            name: `How much does tree removal cost in ${cityName}?`,
            acceptedAnswer: { "@type": "Answer", text: `Costs depend on tree height, diameter, location hazards, and equipment needed. We provide upfront free estimates.` }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: state.name, item: `https://${state.slug}.${DOMAIN}/` },
          { "@type": "ListItem", position: 2, name: cityName, item: canonical }
        ]
      }
    ]
  };

  const neighborhoodZips = [
    [`Downtown ${cityName}`, `Central ${cityName}`],
    [`North ${cityName}`, `Upper ${cityName}`],
    [`South ${cityName}`, `Metro ${cityName}`],
    [`East ${cityName}`, `Heights ${cityName}`],
    [`West ${cityName}`, `Plaza ${cityName}`],
    [`Suburban ${cityName}`, `Westside ${cityName}`],
    [`Highland ${cityName}`, `Parkway ${cityName}`],
    [`Valley ${cityName}`, `County ${cityName}`]
  ];

  const zipCardsHtml = neighborhoodZips.map(([area, sub]) => `<div class="zip-card"><span>📍</span><strong>${esc(area)}</strong><small>${esc(sub)} Area</small></div>`).join("");

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${DOMAIN}/areas-we-serve/">Areas We Serve</a> / <a href="https://${state.slug}.${DOMAIN}/">${esc(state.name)}</a> / ${esc(cityName)}</div><span class="eyebrow">Local tree service guide</span><h1>24/7 Tree Service in <em>${esc(cityName)}, ${esc(state.name)}</em></h1><p>Explore the complete ${services.length}-service directory for ${esc(cityName)}. Review warning signs, tree care procedures, and connect with top local certified arborists.</p><div class="rating-badge"><span class="stars">★★★★★</span><span>Rated 4.9/5 ⭐ Golden Rich Snippet Active</span></div>${trustChecklistHtml()}<div class="buttons"><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a><a class="btn ghost" href="#services">Browse All Services</a></div></div><div>${leadFormHtml(cityName)}</div></div></section><section class="stats"><div class="wrap"><div class="stat"><strong>${services.length}</strong><span>Tree topics</span></div><div class="stat"><strong>${state.code.toUpperCase()}</strong><span>${esc(state.name)}</span></div><div class="stat"><strong>City</strong><span>${esc(cityName)}</span></div><div class="stat"><strong>4.9 ★</strong><span>172+ Client Reviews</span></div></div></section><section class="section soft" id="neighborhoods"><div class="wrap"><div class="head"><div><span class="eyeline">Hyper-Local Coverage</span><h2>Serving ${esc(cityName)} &amp; Surrounding Neighborhoods</h2><p class="muted">Comprehensive 24/7 tree service coverage across all ${esc(cityName)} zones and nearby communities.</p></div></div><div class="zip-grid">${zipCardsHtml}</div></div></section><section class="section" id="services"><div class="wrap"><div class="head"><div><span class="eyeline">Tree services</span><h2>Services to review in ${esc(cityName)}</h2><p class="muted">Select a service topic for detailed inspection guidance and tree care options.</p></div></div><div class="grid">${serviceCards(host, true)}</div></div></section></main>`;
  return shell(`Tree Services in ${cityName}, ${state.name}`, `Browse ${services.length} tree care and removal service topics for ${cityName}, ${state.name}.`, canonical, body, schema);
}

export function localServicePage(state: StateItem, city: [string, string], service: (typeof services)[number], host: string) {
  const [, cityName] = city;
  const canonical = `https://${host}/${service.slug}/`;
  const offerCatalog = {
    "@type": "OfferCatalog",
    name: `Tree Services in ${cityName}, ${state.name}`,
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${s.name} in ${cityName}`,
        description: s.description,
        url: `https://${host}/${s.slug}/`
      }
    }))
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TreeService",
        "@id": `https://${host}/#business`,
        name: `${SITE.name} ${cityName}`,
        url: `https://${host}/`,
        telephone: PHONE_DISPLAY,
        address: {
          "@type": "PostalAddress",
          addressLocality: cityName,
          addressRegion: state.code.toUpperCase(),
          addressCountry: "US"
        },
        priceRange: "$$",
        hasOfferCatalog: offerCatalog
      },
      {
        "@type": "Product",
        name: `${service.name} in ${cityName}, ${state.name}`,
        description: `${service.description} Available in ${cityName}, ${state.name}.`,
        url: canonical,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "158"
        }
      },
      {
        "@type": "Service",
        name: `${service.name} in ${cityName}, ${state.name}`,
        description: service.description,
        url: canonical,
        areaServed: { "@type": "City", name: cityName, containedInPlace: { "@type": "State", name: state.name } }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: state.name, item: `https://${state.slug}.${DOMAIN}/` },
          { "@type": "ListItem", position: 2, name: cityName, item: `https://${host}/` },
          { "@type": "ListItem", position: 3, name: service.name, item: canonical }
        ]
      }
    ]
  };

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${state.slug}.${DOMAIN}/">${esc(state.name)}</a> / <a href="https://${host}/">${esc(cityName)}</a> / ${esc(service.name)}</div><span class="eyebrow">Tree Service</span><h1>${esc(service.name)} in <em>${esc(cityName)}, ${esc(state.name)}</em></h1><p>${esc(service.description)} Review diagnosis tips, safety considerations, and local arborist options.</p><div class="rating-badge"><span class="stars">★★★★★</span><span>4.9/5 ⭐ Rating for ${esc(service.name)}</span></div>${trustChecklistHtml()}<div class="buttons"><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a><a class="btn ghost" href="https://${host}/">All ${services.length} City Services</a></div></div><div>${leadFormHtml(`${service.name} ${cityName}`)}</div></div></section><section class="section soft"><div class="wrap"><div class="head"><div><span class="eyeline">What to expect</span><h2>An arborist-first process</h2></div></div><div class="process"><div class="step"><b>01</b><h3>Initiate Request</h3><p>Call or submit quote form with tree details.</p></div><div class="step"><b>02</b><h3>Provide Details</h3><p>Share specific symptoms (decay, storm damage, power line risk).</p></div><div class="step"><b>03</b><h3>On-Site Inspection</h3><p>Certified arborist inspects tree health, structure, and rigging path.</p></div><div class="step"><b>04</b><h3>Safe Execution</h3><p>Complete removal, trimming, or stump grinding with full cleanup.</p></div></div></div></section></main>`;
  return shell(`${service.name} in ${cityName}, ${state.name}`, `${service.description} Review local tree service info for ${cityName}, ${state.name}.`, canonical, body, schema);
}

export function notFoundPage(message: string) {
  return `<!doctype html><html><head><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>404 | ${SITE.name}</title><style>${CSS}</style></head><body>${header()}<main class="section"><div class="wrap"><span class="eyeline">Page not found</span><h1>404</h1><p>${esc(message)}</p><a class="btn dark" href="https://${DOMAIN}/areas-we-serve/">Browse Service Areas</a></div></main>${footer()}</body></html>`;
}
