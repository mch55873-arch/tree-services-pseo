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
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#fff;color:#172033;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;-webkit-font-smoothing:antialiased}a{color:inherit;text-decoration:none}img,iframe{max-width:100%}.wrap{width:min(1180px,calc(100% - 32px));margin:auto}.top{background:#063a2c;color:#dbe7f5;font-size:12px}.top .wrap,.nav .wrap{display:flex;align-items:center;justify-content:space-between;gap:20px}.top .wrap{padding:9px 0}.top b{color:#d97706}.nav{position:sticky;top:0;z-index:30;background:rgba(255,255,255,.97);backdrop-filter:blur(14px);border-bottom:1px solid #dfe6ee;box-shadow:0 10px 32px rgba(16,24,38,.08)}.nav .wrap{padding:14px 0}.brand{display:flex;align-items:center;gap:11px;font-size:20px;font-weight:950;color:#101826;letter-spacing:-.02em}.logo{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(135deg,#059669,#047857);color:#fff;box-shadow:0 10px 24px rgba(5,150,105,.25);font-size:20px;font-weight:900}.brand small{display:block;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#6c7a8b}.links{display:flex;gap:22px;font-size:14px;font-weight:850}.links a:hover{color:#059669}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:14px 21px;border-radius:10px;background:#d97706;color:#fff;font-weight:900;box-shadow:0 10px 24px rgba(217,119,6,.24);transition:.2s;border:none;cursor:pointer}.btn:hover{transform:translateY(-2px);background:#b45309}.btn.dark{background:#063a2c}.btn.ghost{background:transparent;border:1px solid rgba(255,255,255,.38);box-shadow:none}.hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#042f2e 0%,#064e3b 58%,#059669 100%);color:#fff;padding:78px 0}.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:48px;align-items:center}.hero h1{font-size:clamp(32px,5.5vw,64px);line-height:1.08;letter-spacing:-.04em;margin:18px 0}.hero h1 em{font-style:normal;color:#6ee7b7}.hero p{font-size:17px;line-height:1.75;color:#d6e2ee;max-width:760px}.form-card{background:#fff;color:#0f172a;border-radius:22px;padding:28px;box-shadow:0 24px 60px rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.2)}.form-card h2{font-size:22px;font-weight:900;margin:0 0 6px;color:#101826}.form-card p{font-size:13px;color:#64748b;margin:0 0 20px}.form-group{margin-bottom:14px}.form-group input,.form-group select,.form-group textarea{width:100%;padding:13px 16px;border-radius:10px;border:1px solid #cbd5e1;font-size:14px;outline:none;background:#f8fafc}.form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:#059669;background:#fff;box-shadow:0 0 0 3px rgba(5,150,105,.2)}.rating-badge{display:inline-flex;align-items:center;gap:10px;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);font-size:13px;font-weight:800;color:#fff;margin-top:16px}.stars{color:#f59e0b;letter-spacing:2px}.crumb{font-size:13px;color:#b7cad9}.crumb a{color:#a7f3d0}.eyebrow{display:inline-flex;padding:8px 12px;border-radius:999px;background:rgba(5,150,105,.2);border:1px solid rgba(110,231,183,.4);color:#a7f3d0;font-size:11px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}.buttons{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}.stats{border-bottom:1px solid #dfe6ee;background:#fff}.stats .wrap{display:grid;grid-template-columns:repeat(4,1fr)}.stat{text-align:center;padding:27px 15px;border-left:1px solid #dfe6ee}.stat:first-child{border-left:0}.stat strong{display:block;font-size:31px;color:#064e3b}.stat span{display:block;margin-top:5px;color:#778495;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.1em}.section{padding:78px 0}.soft{background:#f0fdf4}.blue{background:#ecfdf5}.dark-section{background:#042f2e;color:#fff}.head{display:flex;align-items:end;justify-content:space-between;gap:28px;margin-bottom:32px}.eyeline{display:inline-block;color:#059669;font-size:11px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}.section h2{font-size:clamp(28px,4vw,50px);line-height:1.1;margin:8px 0 0;letter-spacing:-.038em}.muted{max-width:760px;color:#667486;line-height:1.75}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.card{display:block;background:#fff;border:1px solid #dfe6ee;border-radius:18px;padding:25px;box-shadow:0 8px 26px rgba(16,24,38,.06);transition:.2s}.card:hover{transform:translateY(-4px);border-color:#34d399;box-shadow:0 18px 40px rgba(16,24,38,.12)}.card b{display:grid;place-items:center;width:46px;height:46px;border-radius:13px;background:#d1fae5;color:#059669;font-size:14px}.card h3{font-size:20px;margin:17px 0 9px;color:#101826;letter-spacing:-.02em}.card p{color:#667486;line-height:1.68;margin:0;font-size:14px}.more{display:inline-block;margin-top:17px;color:#059669;font-weight:900;font-size:14px}.directory{display:grid;grid-template-columns:repeat(4,1fr);gap:13px}.directory a{display:flex;align-items:center;justify-content:space-between;gap:15px;padding:17px 18px;border:1px solid #dfe6ee;border-radius:13px;background:#fff;color:#344054;font-size:14px;font-weight:850;box-shadow:0 6px 18px rgba(16,24,38,.04);transition:.18s}.directory a:after{content:"→";color:#059669}.directory a:hover{transform:translateY(-2px);color:#059669;border-color:#34d399}.zip-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.zip-card{background:#fff;border:1px solid #dfe6ee;border-radius:14px;padding:18px;text-align:center;box-shadow:0 6px 18px rgba(16,24,38,.04);transition:.18s}.zip-card:hover{transform:translateY(-3px);border-color:#059669;box-shadow:0 12px 30px rgba(5,150,105,.2)}.zip-card span{display:block;font-size:20px;margin-bottom:6px}.zip-card strong{display:block;font-size:16px;color:#101826}.zip-card small{display:block;font-size:12px;color:#667486;margin-top:4px;font-weight:700}.checklist{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:20px}.check-item{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:700;color:#1e293b}.check-item span{color:#059669;font-size:16px}.two-col{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}.three-col{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.content{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:40px}.article{font-size:17px;line-height:1.82}.article h2{font-size:28px;color:#101826;margin-top:36px;letter-spacing:-.025em}.article h3{font-size:21px;color:#101826}.article p,.article li{color:#5e6d7e}.article li{margin:8px 0}.side{position:sticky;top:105px;align-self:start;background:linear-gradient(145deg,#042f2e,#064e3b);color:#fff;border-radius:19px;padding:27px;box-shadow:0 18px 45px rgba(16,24,38,.2)}.side p{color:#d5e2ee;line-height:1.65}.side .more{display:block;color:#a7f3d0}.notice{background:#fff7ed;border:1px solid #fed7aa;border-radius:14px;padding:19px;color:#9a3412;line-height:1.65}.process{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:34px}.step{background:#fff;border:1px solid #dfe6ee;border-radius:16px;padding:23px}.step b{font-size:35px;color:#dce7ef}.step h3{font-size:20px;color:#101826}.step p{color:#667486;line-height:1.65}.faq{display:grid;gap:12px;margin-top:28px}.faq details{background:#fff;border:1px solid #dfe6ee;border-radius:13px;padding:18px 20px}.faq summary{cursor:pointer;font-weight:900;color:#101826}.faq p{color:#667486;line-height:1.7}.pre-footer{background:linear-gradient(135deg,#059669,#047857);color:#fff;padding:44px 0}.pre-footer-wrap{display:flex;align-items:center;justify-content:space-between;gap:24px}.pre-footer h2{font-size:28px;font-weight:900;margin:0 0 6px;letter-spacing:-.03em}.pre-footer p{font-size:15px;margin:0;color:#d1fae5}.pre-footer-btns{display:flex;align-items:center;gap:14px;flex-shrink:0}.btn-navy{background:#042f2e;color:#fff;padding:14px 24px;border-radius:10px;font-weight:900;box-shadow:0 10px 24px rgba(0,0,0,.2);display:inline-flex;align-items:center;justify-content:center}.btn-outline{border:1px solid rgba(255,255,255,.5);color:#fff;padding:14px 24px;border-radius:10px;font-weight:900;display:inline-flex;align-items:center;justify-content:center}.footer{background:#042f2e;color:#cbd5e1;padding:64px 0 0}.footer-grid{display:grid;grid-template-columns:1.3fr 1fr 1fr 1.2fr;gap:40px}.footer-brand-title{display:flex;align-items:center;gap:10px;font-size:22px;font-weight:900;color:#fff;margin-bottom:14px}.footer-logo{width:36px;height:36px;border-radius:10px;background:#059669;color:#fff;display:grid;place-items:center;font-weight:900;font-size:16px}.footer-desc{font-size:14px;line-height:1.65;color:#94a3b8;margin-bottom:16px}.footer-rating{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:800;color:#fbbf24;margin-bottom:6px}.footer-license{font-size:12px;color:#64748b}.footer-col h4{color:#fff;font-size:16px;font-weight:900;margin:0 0 18px}.footer-col a{display:block;color:#94a3b8;font-size:14px;margin-bottom:10px;transition:.2s}.footer-col a:hover{color:#34d399}.footer-contact-item{display:flex;align-items:flex-start;gap:10px;color:#94a3b8;font-size:14px;margin-bottom:12px}.footer-contact-item span{color:#34d399;font-size:16px}.sub-footer{border-top:1px solid rgba(255,255,255,.1);padding:24px 0;margin-top:54px;display:flex;align-items:center;justify-content:space-between;font-size:13px;color:#64748b}.sub-footer-links{display:flex;gap:20px;flex-wrap:wrap}.sub-footer-links a{color:#94a3b8}.sub-footer-links a:hover{color:#fff}.sticky{position:fixed;left:18px;right:18px;bottom:18px;z-index:80;text-align:center;box-shadow:0 12px 35px rgba(0,0,0,.35)}.modal-overlay{position:fixed;inset:0;z-index:999;background:rgba(4,47,46,.78);backdrop-filter:blur(8px);display:grid;place-items:center;padding:16px;opacity:0;pointer-events:none;transition:opacity .3s ease}.modal-overlay.active{opacity:1;pointer-events:auto}.modal-box{background:#fff;border-radius:24px;width:min(520px,100%);box-shadow:0 30px 70px rgba(0,0,0,.45);overflow:hidden;position:relative;transform:scale(.95);transition:transform .3s ease}.modal-overlay.active .modal-box{transform:scale(1)}.modal-header{background:linear-gradient(135deg,#042f2e,#064e3b);color:#fff;padding:28px 24px 20px;position:relative}.modal-close{position:absolute;top:16px;right:16px;width:36px;height:36px;border-radius:999px;background:rgba(255,255,255,.15);border:none;color:#fff;font-size:20px;font-weight:900;cursor:pointer;display:grid;place-items:center;transition:.2s}.modal-close:hover{background:rgba(255,255,255,.3)}.modal-header h3{font-size:22px;font-weight:900;margin:0 0 6px}.modal-header p{font-size:13px;color:#a7f3d0;margin:0}.modal-body{padding:24px}.modal-badge{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:800;color:#fbbf24;margin-bottom:12px}.modal-form{display:flex;flex-direction:column;gap:12px}.modal-form input,.modal-form select,.modal-form textarea{width:100%;padding:13px 16px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;outline:none}.modal-form input:focus,.modal-form select:focus,.modal-form textarea:focus{border-color:#059669;background:#fff;box-shadow:0 0 0 3px rgba(5,150,105,.2)}.modal-submit{background:#d97706;color:#fff;font-weight:900;font-size:16px;padding:15px;border-radius:10px;border:none;cursor:pointer;box-shadow:0 10px 24px rgba(217,119,6,.3);transition:.2s}.modal-submit:hover{background:#b45309}.modal-trust{display:flex;align-items:center;justify-content:center;gap:16px;font-size:11px;color:#64748b;margin-top:14px;font-weight:700}@media(max-width:920px){.links{display:none}.hero-grid,.content,.pre-footer-wrap,.footer-grid,.two-col{grid-template-columns:1fr;flex-direction:column;align-items:flex-start}.grid,.zip-grid,.checklist,.three-col{grid-template-columns:repeat(2,1fr)}.directory{grid-template-columns:repeat(2,1fr)}.process{grid-template-columns:repeat(2,1fr)}.side{position:static}.sub-footer{flex-direction:column;gap:14px;align-items:flex-start}.pre-footer-btns{width:100%;flex-direction:column}.pre-footer-btns a{width:100%}}@media(max-width:620px){.top span:last-child{display:none}.hero{padding:48px 0}.hero h1{font-size:32px}.grid,.directory,.process,.zip-grid,.checklist,.footer-grid,.three-col,.two-col{grid-template-columns:1fr}.stats .wrap{grid-template-columns:1fr 1fr}.stat:nth-child(3){border-left:0;border-top:1px solid #dfe6ee}.stat:nth-child(4){border-top:1px solid #dfe6ee}.head{display:block}.btn{width:100%}.sticky{left:12px;right:12px;bottom:12px}.form-card{padding:20px}.modal-box{border-radius:18px}.modal-header{padding:20px 16px}.modal-body{padding:16px}}
`;

function esc(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] || char);
}

function header() {
  return `<div class="top"><div class="wrap"><span>● &nbsp; Nationwide certified arborist information and tree service provider directory</span><span><b>Independent provider network</b> &nbsp; | &nbsp; Call ${PHONE_DISPLAY}</span></div></div><header class="nav"><div class="wrap"><a class="brand" href="https://${DOMAIN}/"><span class="logo">CT</span><span>${SITE.name}<small>Tree Removal · Trimming · Stump Grinding</small></span></a><nav class="links"><a href="https://${DOMAIN}/services/">Services</a><a href="https://${DOMAIN}/areas-we-serve/">Areas We Serve</a><a href="https://${DOMAIN}/articles/">Arborist Guides</a><a href="https://${DOMAIN}/about/">About</a><a href="https://${DOMAIN}/contact/">Contact</a></nav><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></header>`;
}

function footer() {
  return `
<section class="pre-footer">
  <div class="wrap pre-footer-wrap">
    <div>
      <h2>Hazardous Tree or Emergency Storm Damage? Let's Fix That Today.</h2>
      <p>Same-day certified arborist &amp; emergency tree removal across all 50 states. Friendly, licensed &amp; upfront pricing.</p>
    </div>
    <div class="pre-footer-btns">
      <a class="btn-navy" href="${PHONE_HREF}">📞 Call ${PHONE_DISPLAY}</a>
      <a class="btn-outline" href="https://${DOMAIN}/contact/">Request Online Quote</a>
    </div>
  </div>
</section>
<footer class="footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <div class="footer-brand-title">
          <span class="footer-logo">CT</span>
          <span>${SITE.name}</span>
        </div>
        <p class="footer-desc">Nationwide certified arborist &amp; emergency tree removal specialists. Licensed, fully insured, and independent arborist referral network since 2010.</p>
        <div class="footer-rating">
          <span>★★★★★</span>
          <span>4.9/5 · 17,200+ Verified Reviews</span>
        </div>
        <div class="footer-license">ISA Certified Arborist #XXXXXX · Fully Insured &amp; Bonded</div>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <a href="https://${DOMAIN}/services/tree-removal/">Emergency Tree Removal</a>
        <a href="https://${DOMAIN}/services/tree-trimming/">Tree Trimming &amp; Pruning</a>
        <a href="https://${DOMAIN}/services/stump-grinding/">Stump Grinding Service</a>
        <a href="https://${DOMAIN}/services/arborist-inspection/">Arborist Health Assessment</a>
        <a href="https://${DOMAIN}/services/tree-cabling-bracing/">Tree Cabling &amp; Bracing</a>
        <a href="https://${DOMAIN}/services/">All ${services.length} Services →</a>
      </div>
      <div class="footer-col">
        <h4>Service Areas</h4>
        <a href="https://${DOMAIN}/areas-we-serve/">All 51 States &amp; DC</a>
        <a href="https://california.${DOMAIN}/">California Tree Services</a>
        <a href="https://texas.${DOMAIN}/">Texas Tree Services</a>
        <a href="https://florida.${DOMAIN}/">Florida Tree Services</a>
        <a href="https://illinois.${DOMAIN}/">Illinois Tree Services</a>
        <a href="https://${DOMAIN}/areas-we-serve/">All 30,900+ Cities →</a>
      </div>
      <div class="footer-col">
        <h4>Get In Touch</h4>
        <div class="footer-contact-item">
          <span>📞</span>
          <a href="${PHONE_HREF}" style="color:#fff;font-weight:900;font-size:16px;">${PHONE_DISPLAY}</a>
        </div>
        <div class="footer-contact-item">
          <span>✉️</span>
          <span>dispatch@${DOMAIN}</span>
        </div>
        <div class="footer-contact-item">
          <span>📍</span>
          <span>Nationwide Arborist Network, USA</span>
        </div>
        <div class="footer-contact-item">
          <span>🕒</span>
          <span>Mon–Sat 7am–7pm · 24/7 Emergency Response</span>
        </div>
      </div>
    </div>
    <div class="sub-footer">
      <div>© ${new Date().getUTCFullYear()} ${SITE.name}. All rights reserved.</div>
      <div class="sub-footer-links">
        <a href="https://${DOMAIN}/about/">About</a>
        <a href="https://${DOMAIN}/services/">Services</a>
        <a href="https://${DOMAIN}/areas-we-serve/">Areas</a>
        <a href="https://${DOMAIN}/provider-disclosure/">Disclosure</a>
        <a href="https://${DOMAIN}/privacy-policy/">Privacy</a>
        <a href="https://${DOMAIN}/terms/">Terms</a>
      </div>
    </div>
  </div>
</footer>
`;
}

function leadFormHtml(locationTitle: string) {
  return `<div class="form-card"><h2>Request Free Tree Quote</h2><p>Get best estimate for certified tree care in ${esc(locationTitle)}</p><form action="${PHONE_HREF}" method="GET"><div class="form-group"><input type="text" placeholder="Your Full Name *" required></div><div class="form-group"><input type="tel" placeholder="Phone Number *" required></div><div class="form-group"><select required><option value="">Select Service Needed *</option><option>Emergency Tree Removal</option><option>Tree Trimming &amp; Pruning</option><option>Stump Grinding &amp; Removal</option><option>Hazard Tree Inspection</option><option>Storm Damage Clearance</option><option>Land &amp; Lot Clearing</option></select></div><div class="form-group"><textarea rows="2" placeholder="Describe tree size or property details..."></textarea></div><button type="submit" class="btn" style="width:100%">Submit &amp; Call ${PHONE_DISPLAY}</button></form></div>`;
}

function trustChecklistHtml() {
  return `<div class="checklist"><div class="check-item"><span>✔</span> Upfront &amp; Competitive Tree Estimates</div><div class="check-item"><span>✔</span> Certified Arborists &amp; Licensed Crews</div><div class="check-item"><span>✔</span> Knowledge of Local Streets &amp; Hazards</div><div class="check-item"><span>✔</span> 24/7 Emergency Storm Damage Line</div><div class="check-item"><span>✔</span> Heavy Removal &amp; Crane Operations</div><div class="check-item"><span>✔</span> 100% Property Protection Commitment</div></div>`;
}

function popupModalHtml() {
  return `<div id="quote-modal" class="modal-overlay" aria-hidden="true"><div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-header"><button type="button" class="modal-close" id="close-quote-modal" aria-label="Close modal">✕</button><div class="modal-badge">★★★★★ <span>4.9/5 Rating by 17,200+ Homeowners</span></div><h3 id="modal-title">Get Instant Free Arborist Estimate</h3><p>Fast response within 15 minutes · Available 24/7 nationwide</p></div><div class="modal-body"><form class="modal-form" action="${PHONE_HREF}" method="GET"><div><input type="text" placeholder="Your Full Name *" required></div><div><input type="tel" placeholder="Phone Number *" required></div><div><input type="email" placeholder="Email Address *" required></div><div><select required><option value="">Select Service Needed *</option><option>Emergency Tree Removal</option><option>Tree Trimming &amp; Pruning</option><option>Stump Grinding &amp; Removal</option><option>Arborist Hazard Assessment</option><option>Storm Damage Clearance</option><option>Land &amp; Lot Clearing</option></select></div><div><textarea rows="2" placeholder="Briefly describe your tree issue or address..."></textarea></div><button type="submit" class="modal-submit">📞 Send Quote Request</button><div class="modal-trust"><span>🔒 100% Free Quote</span><span>•</span><span>No Obligation</span><span>•</span><span>Licensed &amp; Insured</span></div></form></div></div></div><script>document.addEventListener("DOMContentLoaded",function(){var m=document.getElementById("quote-modal");var c=document.getElementById("close-quote-modal");function openM(){if(m){m.classList.add("active");m.setAttribute("aria-hidden","false");}}function closeM(){if(m){m.classList.remove("active");m.setAttribute("aria-hidden","true");}}if(c)c.addEventListener("click",closeM);if(m)m.addEventListener("click",function(e){if(e.target===m)closeM();});document.addEventListener("keydown",function(e){if(e.key==="Escape")closeM();});setTimeout(function(){if(!sessionStorage.getItem("modalShown")){openM();sessionStorage.setItem("modalShown","true");}},5000);document.querySelectorAll("a").forEach(function(el){if(el.getAttribute("href")&&el.getAttribute("href").indexOf("/contact")!==-1){el.addEventListener("click",function(e){e.preventDefault();openM();});}});});</script>`;
}

function shell(title: string, description: string, canonical: string, body: string, schema: unknown) {
  const schemaJson = JSON.stringify(schema).replace(/</g, "\\u003c");
  return `<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | ${SITE.name}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonical}"><meta name="robots" content="index,follow"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><style>${CSS}</style><script type="application/ld+json">${schemaJson}</script></head><body>${header()}${body}${popupModalHtml()}${footer()}<a class="btn sticky" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></body></html>`;
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
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
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

  const latestArticles = (articles as any[]).slice(0, 4);
  const articleCardsHtml = latestArticles.map((art, idx) => `
    <div style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid #cbd5e1;box-shadow:0 10px 25px rgba(0,0,0,.05);display:flex;flex-direction:column;">
      <a href="https://${DOMAIN}/articles/${art.slug}/">
        <img src="${art.image || '/images/tree' + ((idx % 5) + 1) + '.jpg'}" alt="${esc(art.title)}" style="width:100%;height:190px;object-fit:cover;">
      </a>
      <div style="padding:20px;display:flex;flex-direction:column;flex-grow:1;">
        <small style="color:#059669;font-weight:700;font-size:12px;text-transform:uppercase;margin-bottom:8px;">May ${28 + (idx % 4)}, 2026</small>
        <h3 style="font-size:16px;font-weight:800;color:#0f172a;margin:0 0 10px;line-height:1.4;">
          <a href="https://${DOMAIN}/articles/${art.slug}/" style="color:#0f172a;text-decoration:none;">${esc(art.title)}</a>
        </h3>
        <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0 0 16px;flex-grow:1;">${esc(art.summary.substring(0, 105))}...</p>
        <a href="https://${DOMAIN}/articles/${art.slug}/" style="color:#059669;font-weight:800;font-size:14px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">Read More →</a>
      </div>
    </div>
  `).join("");

  const body = `
<main>
  <!-- Hero Section matching waterdamagerestorationfairfaxva.com -->
  <section class="hero" style="position:relative;background:linear-gradient(to right, rgba(4,47,46,0.92), rgba(6,78,59,0.85)), url('https://images.pexels.com/photos/34859642/pexels-photo-34859642.jpeg?auto=compress&cs=tinysrgb&w=1600') center/cover no-repeat;padding:90px 0;">
    <div class="wrap hero-grid" style="display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center;">
      <div>
        <h1 style="font-size:clamp(40px,5vw,60px);line-height:1.08;color:#fff;font-weight:900;margin:0 0 20px;letter-spacing:-.03em;">
          24/7 Emergency Tree Removal &amp; Arborist Services
        </h1>
        <p style="font-size:18px;line-height:1.7;color:#e2e8f0;margin:0 0 28px;max-width:620px;">
          Fast, reliable tree removal, structural pruning, stump grinding, and storm damage clearance for homes and businesses. Licensed certified arborist network available 24/7.
        </p>
        <div class="buttons" style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:32px;">
          <a class="btn" href="${PHONE_HREF}" style="background:#d97706;padding:16px 28px;font-size:18px;box-shadow:0 10px 24px rgba(217,119,6,.3);">
            📞 ${PHONE_DISPLAY}
          </a>
          <a class="btn ghost" href="#quote-form" style="border:2px solid #fff;color:#fff;padding:16px 28px;font-size:18px;">
            Get Free Quote
          </a>
        </div>
        <!-- Customer Reviews Badge -->
        <div style="background:rgba(255,255,255,.12);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.2);padding:14px 20px;border-radius:16px;display:inline-flex;align-items:center;gap:16px;">
          <div style="display:flex;margin-right:-8px;">
            <div style="width:36px;height:36px;border-radius:999px;background:#059669;color:#fff;display:grid;place-items:center;font-weight:900;border:2px solid #fff;font-size:14px;">👤</div>
            <div style="width:36px;height:36px;border-radius:999px;background:#047857;color:#fff;display:grid;place-items:center;font-weight:900;border:2px solid #fff;font-size:14px;margin-left:-10px;">👤</div>
            <div style="width:36px;height:36px;border-radius:999px;background:#065f46;color:#fff;display:grid;place-items:center;font-weight:900;border:2px solid #fff;font-size:14px;margin-left:-10px;">👤</div>
          </div>
          <div>
            <div style="color:#fbbf24;letter-spacing:2px;font-size:16px;">★★★★★</div>
            <div style="color:#fff;font-size:13px;font-weight:800;margin-top:2px;">Rated 5 stars by 17,200+ customers</div>
          </div>
        </div>
      </div>

      <!-- Lead Capture Form Card -->
      <div id="quote-form" style="background:#fff;border-radius:24px;padding:32px;box-shadow:0 25px 60px rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.3);">
        <h2 style="font-size:24px;font-weight:900;color:#0f172a;margin:0 0 6px;">Get Free Quote</h2>
        <p style="font-size:14px;color:#64748b;margin:0 0 20px;">Fill out the form and we'll get back to you within 24 hours.</p>
        <form action="${PHONE_HREF}" method="GET" style="display:flex;flex-direction:column;gap:14px;">
          <div>
            <input type="text" placeholder="Your Name *" required style="width:100%;padding:14px 16px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;outline:none;">
          </div>
          <div>
            <input type="email" placeholder="Email Address *" required style="width:100%;padding:14px 16px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;outline:none;">
          </div>
          <div>
            <input type="tel" placeholder="Phone Number *" required style="width:100%;padding:14px 16px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;outline:none;">
          </div>
          <div>
            <textarea rows="3" placeholder="How can we help you? *" required style="width:100%;padding:14px 16px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;outline:none;resize:none;"></textarea>
          </div>
          <button type="submit" class="btn" style="width:100%;background:#d97706;padding:16px;font-size:16px;font-weight:900;box-shadow:0 10px 24px rgba(217,119,6,.3);">
            Send My Request
          </button>
          <p style="font-size:11px;color:#94a3b8;text-align:center;margin:0;">By submitting, you agree to be contacted about your request. We respect your privacy.</p>
        </form>
      </div>
    </div>
  </section>

  <!-- Key Stats Strip -->
  <section class="stats">
    <div class="wrap">
      <div class="stat"><strong>51</strong><span>States &amp; DC</span></div>
      <div class="stat"><strong>${services.length}</strong><span>Tree Topics</span></div>
      <div class="stat"><strong>30,900+</strong><span>City Hubs</span></div>
      <div class="stat"><strong>24/7</strong><span>Emergency Line</span></div>
    </div>
  </section>

  <!-- Why Choose Us / Value Pillars -->
  <section class="section soft">
    <div class="wrap">
      <div style="text-align:center;max-width:700px;margin:0 auto 40px;">
        <span class="eyeline">Why Choose Us</span>
        <h2>Professional Certified Arborist Standards</h2>
        <p class="muted" style="margin:8px auto 0;">We combine heavy equipment capabilities with strict safety compliance across all 50 states.</p>
      </div>
      <div class="grid" style="grid-template-columns:repeat(4,1fr);">
        <div class="card">
          <b>⚡</b>
          <h3>24/7 Emergency Response</h3>
          <p>Rapid dispatch for fallen trees on roofs, power lines, and driveways after storms.</p>
        </div>
        <div class="card">
          <b>🛡️</b>
          <h3>ISA Certified Arborists</h3>
          <p>Trained specialists evaluating wood density, decay conks, and structural risks.</p>
        </div>
        <div class="card">
          <b>📋</b>
          <h3>Upfront Written Quotes</h3>
          <p>Flat-rate pricing approved before work begins. No unexpected bill surprises.</p>
        </div>
        <div class="card">
          <b>🧹</b>
          <h3>Total Property Protection</h3>
          <p>Ground protection mats, precision rigging, and 100% wood chipping cleanup.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FROM OUR BLOG SECTION matching user screenshot -->
  <section class="section" style="background:#f8fafc;padding:80px 0;border-top:1px solid #e2e8f0;">
    <div class="wrap">
      <div style="text-align:center;max-width:750px;margin:0 auto 48px;">
        <span style="color:#059669;font-weight:800;font-size:13px;letter-spacing:.14em;text-transform:uppercase;display:block;margin-bottom:8px;">FROM OUR BLOG</span>
        <h2 style="font-size:36px;font-weight:900;color:#0f172a;margin:0 0 12px;letter-spacing:-.02em;">Tree Care &amp; Arborist Tips &amp; Resources</h2>
        <p style="color:#64748b;font-size:16px;margin:0;">Expert tree removal advice, safety guides, and insights from CAN Tree Service to help you make informed decisions.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;">
        ${articleCardsHtml}
      </div>
    </div>
  </section>

  <!-- State Directory Section -->
  <section class="section" id="states">
    <div class="wrap">
      <div class="head">
        <div>
          <span class="eyeline">Areas We Serve</span>
          <h2>Tree service directory by state</h2>
          <p class="muted">Select your state to explore local city subdomains and communities.</p>
        </div>
      </div>
      <div class="directory">${stateLinks}</div>
    </div>
  </section>

  <!-- Service Directory Section -->
  <section class="section soft" id="services">
    <div class="wrap">
      <div class="head">
        <div>
          <span class="eyeline">Services Directory</span>
          <h2>All ${services.length} tree care services</h2>
          <p class="muted">Review tree removal, trimming, pruning, stump grinding, cabling, and hazard inspections.</p>
        </div>
      </div>
      <div class="grid">${serviceCards(DOMAIN, false)}</div>
    </div>
  </section>
</main>
`;
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
        provider: { "@type": "Organization", name: SITE.name, url: `https://${DOMAIN}/` },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "172"
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `What is included in ${service.name}?`,
            acceptedAnswer: { "@type": "Answer", text: `${service.description} Our certified arborists provide full on-site evaluation, safety rigging, execution, and site cleanup.` }
          },
          {
            "@type": "Question",
            name: `How much does ${service.name} cost?`,
            acceptedAnswer: { "@type": "Answer", text: `Costs depend on tree size, location hazards, and equipment needed. We provide firm upfront flat-rate estimates before work begins.` }
          },
          {
            "@type": "Question",
            name: `Is ${service.name} covered by homeowners insurance?`,
            acceptedAnswer: { "@type": "Answer", text: `If tree damage is caused by storm winds, lightning, or unexpected collapse onto insured structures, insurance typically covers removal costs.` }
          }
        ]
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

  const body = `
<main>
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <div class="crumb"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/services/">Services</a> / ${esc(service.name)}</div>
        <span class="eyebrow">⚡ Same-Day Service Available</span>
        <h1>${esc(service.name)} <em>Guide &amp; Referral Hub</em></h1>
        <p>${esc(service.description)} Fast, licensed, and certified arborist response across all 50 states.</p>
        <div class="buttons">
          <a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a>
          <a class="btn ghost" href="https://${DOMAIN}/contact/">Request Free Quote</a>
        </div>
      </div>
      <div>${leadFormHtml(service.name)}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap" style="display:grid;grid-template-columns:1.8fr 1fr;gap:40px;">
      <div>
        <span class="eyeline">Comprehensive Care</span>
        <h2>Trusted ${esc(service.name)} Specialists</h2>
        <p style="color:#64748b;line-height:1.75;font-size:16px;">When managing hazardous trees, leaning limbs, or overgrown canopies, you need experienced arborists who prioritize safety and property protection. For over 15 years, our network of certified tree specialists has delivered safe, compliant, and honest tree care services nationwide.</p>
        <p style="color:#64748b;line-height:1.75;font-size:16px;">Every project starts with a detailed risk assessment and a clear, flat-rate quote you approve before we begin. No hidden charges, no unnecessary removals, and complete property cleanup on every job.</p>

        <h3 style="font-size:22px;color:#042f2e;margin-top:36px;">Signs You Need ${esc(service.name)}</h3>
        <p style="color:#64748b;margin-bottom:20px;">If your trees display any of these warning signs, schedule a professional evaluation immediately:</p>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px;">
          <div style="background:#f8fafc;padding:16px;border-radius:12px;border:1px solid #e2e8f0;display:flex;gap:12px;"><span style="color:#d97706;font-size:18px;">⚠️</span><span style="font-size:14px;color:#334155;font-weight:700;">Sudden trunk lean or soil heaving</span></div>
          <div style="background:#f8fafc;padding:16px;border-radius:12px;border:1px solid #e2e8f0;display:flex;gap:12px;"><span style="color:#d97706;font-size:18px;">⚠️</span><span style="font-size:14px;color:#334155;font-weight:700;">Cracked, splitting, or hollow bark</span></div>
          <div style="background:#f8fafc;padding:16px;border-radius:12px;border:1px solid #e2e8f0;display:flex;gap:12px;"><span style="color:#d97706;font-size:18px;">⚠️</span><span style="font-size:14px;color:#334155;font-weight:700;">Overhanging limbs near power lines</span></div>
          <div style="background:#f8fafc;padding:16px;border-radius:12px;border:1px solid #e2e8f0;display:flex;gap:12px;"><span style="color:#d97706;font-size:18px;">⚠️</span><span style="font-size:14px;color:#334155;font-weight:700;">Deadwood &amp; fungal mushroom conks</span></div>
        </div>

        <h3 style="font-size:22px;color:#042f2e;margin-top:36px;">Capabilities &amp; Services We Handle</h3>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:14px;">
          <div style="font-size:14px;color:#334155;font-weight:700;">✓ ISA Certified Arborist Evaluation</div>
          <div style="font-size:14px;color:#334155;font-weight:700;">✓ Heavy Crane-Assisted Rigging</div>
          <div style="font-size:14px;color:#334155;font-weight:700;">✓ Full Canopy Thinning &amp; Pruning</div>
          <div style="font-size:14px;color:#334155;font-weight:700;">✓ On-Site Wood Chipping &amp; Mulching</div>
          <div style="font-size:14px;color:#334155;font-weight:700;">✓ Root Barrier &amp; Foundation Defense</div>
          <div style="font-size:14px;color:#334155;font-weight:700;">✓ Emergency Storm Damage Response</div>
        </div>

        <h3 style="font-size:22px;color:#042f2e;margin-top:36px;">Frequently Asked Questions</h3>
        <div class="faq">
          <details open><summary>What is included in ${esc(service.name)}?</summary><p>${esc(service.description)} Our certified arborists handle site evaluation, heavy rigging, wood chipping, and full debris haul-away.</p></details>
          <details><summary>How much does ${esc(service.name)} cost?</summary><p>Pricing depends on tree height, location hazards, and equipment required. We provide flat-rate written quotes before starting work.</p></details>
          <details><summary>Is emergency service available 24/7?</summary><p>Yes, emergency storm damage and fallen tree removal crews operate 24 hours a day, 7 days a week.</p></details>
        </div>
      </div>
      <div>${leadFormHtml(service.name)}</div>
    </div>
  </section>
</main>
`;
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

  const sectionsHtml = (article.sections || []).map((sec: any) => `
    <h2>${esc(sec.heading)}</h2>
    <div>${sec.content}</div>
  `).join("");

  const directAnswerBox = article.directAnswer ? `
    <div style="background:#f0fdf4;border:2px solid #059669;border-radius:16px;padding:24px;margin:28px 0;">
      <h3 style="color:#042f2e;margin-top:0;font-size:18px;display:flex;align-items:center;gap:8px;">💡 Key Takeaway / Quick Answer</h3>
      <p style="color:#166534;font-size:16px;line-height:1.7;margin:0;"><strong>${esc(article.directAnswer)}</strong></p>
    </div>
  ` : "";

  const warningSignsHtml = (article.warningSigns && article.warningSigns.length > 0) ? `
    <h3>Key Warning Signs to Inspect</h3>
    <ul>${article.warningSigns.map((w: string) => `<li>${esc(w)}</li>`).join("")}</ul>
  ` : "";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.summary || article.description || "",
        url: canonical,
        publisher: { "@type": "Organization", name: SITE.name, url: `https://${DOMAIN}/` },
        author: { "@type": "Organization", name: "Can Tree Service Arborist Team" }
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

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/articles/">Articles</a> / ${esc(article.title)}</div><span class="eyebrow">${esc(article.category || "Arborist Guide")}</span><h1>${esc(article.title)}</h1><p>${esc(article.summary || "")}</p><div class="buttons"><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div>${leadFormHtml(article.title)}</div></div></section><section class="section content"><div class="wrap article">${directAnswerBox}${sectionsHtml}${warningSignsHtml}</div></section></main>`;
  return shell(`${article.title} - ${SITE.name}`, article.summary || "", canonical, body, schema);
}

export function aboutPage() {
  const canonical = `https://${DOMAIN}/about/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        name: `About ${SITE.name}`,
        url: canonical,
        mainEntity: {
          "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
          name: SITE.name,
          telephone: PHONE_DISPLAY,
          foundingDate: "2010",
          url: `https://${DOMAIN}/`
        }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${DOMAIN}/` },
          { "@type": "ListItem", position: 2, name: "About", item: canonical }
        ]
      }
    ]
  };

  const body = `
<main>
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <div class="crumb"><a href="https://${DOMAIN}/">Home</a> / About</div>
        <span class="eyebrow">Local &amp; Family Owned</span>
        <h1>Your Neighbors in the <em>Tree Service Business</em></h1>
        <p>Family-owned, licensed, and rooted across the United States since 2010. We've built our reputation one honest job at a time.</p>
        <div class="buttons">
          <a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a>
          <a class="btn ghost" href="https://${DOMAIN}/contact/">Request Free Quote</a>
        </div>
      </div>
      <div>${leadFormHtml("About Us")}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap" style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;">
      <div>
        <span class="eyeline">Our Story</span>
        <h2>Built on Honesty, One Tree at a Time</h2>
        <p style="color:#64748b;line-height:1.75;font-size:16px;">${SITE.name} began in 2010 with one truck, one certified arborist, and a frustration shared by many property owners: it was hard to find a tree care company who'd give a straight answer and a fair price. We set out to be that company — specialists who do tree removal and trimming right, explain things plainly, and stand behind every job.</p>
        <p style="color:#64748b;line-height:1.75;font-size:16px;">More than a decade later, we've serviced over 17,200 trees across all 50 states. We've grown, but our promise hasn't changed: treat every property like our own, never sell you a removal you don't need, and always pick up the phone.</p>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px;text-align:center;">
          <div style="background:#f8fafc;padding:20px;border-radius:14px;border:1px solid #e2e8f0;"><strong style="display:block;font-size:28px;color:#042f2e;">15+</strong><span style="font-size:12px;color:#64748b;font-weight:700;">Years Operating</span></div>
          <div style="background:#f8fafc;padding:20px;border-radius:14px;border:1px solid #e2e8f0;"><strong style="display:block;font-size:28px;color:#042f2e;">17,200+</strong><span style="font-size:12px;color:#64748b;font-weight:700;">Trees Serviced</span></div>
          <div style="background:#f8fafc;padding:20px;border-radius:14px;border:1px solid #e2e8f0;"><strong style="display:block;font-size:28px;color:#042f2e;">4.9★</strong><span style="font-size:12px;color:#64748b;font-weight:700;">Avg. Rating</span></div>
        </div>
      </div>
      <div style="position:relative;">
        <img src="https://images.pexels.com/photos/34859642/pexels-photo-34859642.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Certified Arborist at Can Tree Service" style="width:100%;border-radius:20px;box-shadow:0 20px 50px rgba(0,0,0,.15);aspect-ratio:4/3;object-fit:cover;">
        <div style="position:absolute;bottom:-20px;left:20px;background:#fff;padding:16px 20px;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.12);display:flex;align-items:center;gap:12px;border:1px solid #e2e8f0;">
          <span style="font-size:24px;color:#059669;">🛡️</span>
          <div><strong style="display:block;font-size:14px;color:#0f172a;">ISA Certified &amp; Insured</strong><small style="color:#64748b;font-weight:700;">License #XXXXXX · $2M Liability</small></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section soft">
    <div class="wrap">
      <div style="text-align:center;max-width:700px;margin:0 auto 40px;">
        <span class="eyeline">What We Stand For</span>
        <h2>The Promises Behind Every Job</h2>
      </div>
      <div class="grid" style="grid-template-columns:repeat(4,1fr);">
        <div class="card"><b>01</b><h3>Honesty First</h3><p>If a tree can be saved with cabling or pruning, we'll tell you. We never upsell a removal you don't need.</p></div>
        <div class="card"><b>02</b><h3>Show Up Fast</h3><p>Same-day and 24/7 emergency storm service because fallen hazardous trees can't wait.</p></div>
        <div class="card"><b>03</b><h3>Upfront Pricing</h3><p>Flat-rate written quotes you approve before work starts. No hidden surprises on the bill.</p></div>
        <div class="card"><b>04</b><h3>Respect Your Home</h3><p>Ground protection mats, clean work zones, and full wood chipping on every project.</p></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div style="text-align:center;max-width:700px;margin:0 auto 40px;">
        <span class="eyeline">Meet The Team</span>
        <h2>The People Who Show Up</h2>
        <p class="muted" style="margin:8px auto 0;">Background-checked, ISA-trained, and genuinely friendly professional tree specialists.</p>
      </div>
      <div class="grid" style="grid-template-columns:repeat(3,1fr);">
        <div class="card" style="text-align:center;">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" style="width:96px;height:96px;border-radius:999px;object-fit:cover;margin:0 auto;">
          <h3>Mike Alvarez</h3>
          <span style="color:#059669;font-weight:800;font-size:14px;">Owner / Master Arborist</span>
          <p style="margin-top:8px;">Founded the company in 2010. 20+ years of mature shade tree experience.</p>
        </div>
        <div class="card" style="text-align:center;">
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" style="width:96px;height:96px;border-radius:999px;object-fit:cover;margin:0 auto;">
          <h3>David Chen</h3>
          <span style="color:#059669;font-weight:800;font-size:14px;">Lead Crane &amp; Climber</span>
          <p style="margin-top:8px;">Heavy crane rigging specialist certified on ISA &amp; OSHA tree safety.</p>
        </div>
        <div class="card" style="text-align:center;">
          <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80" style="width:96px;height:96px;border-radius:999px;object-fit:cover;margin:0 auto;">
          <h3>Sarah Nguyen</h3>
          <span style="color:#059669;font-weight:800;font-size:14px;">Customer Care Lead</span>
          <p style="margin-top:8px;">The friendly voice who schedules your same-day arborist assessment.</p>
        </div>
      </div>
    </div>
  </section>
</main>
`;
  return shell(`About Us | ${SITE.name}`, `Learn about ${SITE.name} — licensed, insured, family-owned arborist company serving the US since 2010.`, canonical, body, schema);
}

export function contactPage() {
  const canonical = `https://${DOMAIN}/contact/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: `Contact ${SITE.name}`,
        url: canonical,
        mainEntity: {
          "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
          name: SITE.name,
          telephone: PHONE_DISPLAY,
          email: `dispatch@${DOMAIN}`,
          priceRange: "$$",
          availableLanguage: ["English", "Spanish"]
        }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${DOMAIN}/` },
          { "@type": "ListItem", position: 2, name: "Contact", item: canonical }
        ]
      }
    ]
  };

  const body = `
<main>
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <div class="crumb"><a href="https://${DOMAIN}/">Home</a> / Contact</div>
        <span class="eyebrow">Fast Response</span>
        <h1>Get In Touch for <em>Fast Tree Service</em></h1>
        <p>Call for same-day emergency tree removal, or request a free quote online. Friendly, licensed, and local arborist network.</p>
        <div class="buttons">
          <a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a>
        </div>
      </div>
      <div>${leadFormHtml("Contact Page")}</div>
    </div>
  </section>

  <section class="section soft">
    <div class="wrap" style="display:grid;grid-template-columns:1.2fr 1fr;gap:40px;">
      <div>${leadFormHtml("Request Free Quote")}</div>
      <div style="display:flex;flex-direction:column;gap:24px;">
        <div style="background:#042f2e;color:#fff;border-radius:22px;padding:32px;box-shadow:0 18px 45px rgba(0,0,0,.2);">
          <h2 style="font-size:24px;color:#fff;margin:0 0 20px;">Contact Details</h2>
          <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">
            <span style="font-size:24px;color:#34d399;">📞</span>
            <div><small style="display:block;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:.1em;">Phone</small><a href="${PHONE_HREF}" style="font-size:20px;font-weight:900;color:#fff;">${PHONE_DISPLAY}</a></div>
          </div>
          <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">
            <span style="font-size:24px;color:#34d399;">✉️</span>
            <div><small style="display:block;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:.1em;">Email</small><strong style="font-size:16px;color:#fff;">dispatch@${DOMAIN}</strong></div>
          </div>
          <div style="display:flex;align-items:center;gap:14px;margin-bottom:24px;">
            <span style="font-size:24px;color:#34d399;">📍</span>
            <div><small style="display:block;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:.1em;">Coverage</small><strong style="font-size:16px;color:#fff;">All 50 US States &amp; DC</strong></div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,.1);padding-top:20px;">
            <h3 style="font-size:16px;color:#fff;margin:0 0 12px;">Hours of Operation</h3>
            <table style="width:100%;font-size:14px;color:#cbd5e1;line-height:2;">
              <tr><td>Monday – Friday</td><td style="text-align:right;color:#fff;font-weight:700;">7:00 AM – 7:00 PM</td></tr>
              <tr><td>Saturday</td><td style="text-align:right;color:#fff;font-weight:700;">7:00 AM – 7:00 PM</td></tr>
              <tr><td>Sunday</td><td style="text-align:right;color:#fff;font-weight:700;">Emergency Only</td></tr>
              <tr><td style="color:#f59e0b;font-weight:900;">24/7 Emergencies</td><td style="text-align:right;color:#f59e0b;font-weight:900;">Available 24 Hours</td></tr>
            </table>
          </div>
        </div>
        <div style="border-radius:22px;overflow:hidden;border:1px solid #dfe6ee;box-shadow:0 10px 30px rgba(0,0,0,.06);">
          <iframe title="Service Coverage Map" src="https://www.google.com/maps?q=United+States&output=embed" width="100%" height="280" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
      </div>
    </div>
  </section>
</main>
`;
  return shell(`Contact Us | ${SITE.name}`, `Contact ${SITE.name} for same-day tree service and emergency storm damage clearance across the United States.`, canonical, body, schema);
}

export function infoPage(title: string, content: string, path: string) {
  if (path === "/about" || path === "/about/") return aboutPage();
  if (path === "/contact" || path === "/contact/") return contactPage();

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
        "@type": ["TreeService", "LocalBusiness", "HomeAndConstructionBusiness"],
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
        areaServed: neighborhoodZips.map(([area]) => ({
          "@type": "AdministrativeArea",
          name: `${area}, ${state.code.toUpperCase()}`
        })),
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
        name: `Tree Services & Certified Arborist Care in ${cityName}, ${state.name}`,
        description: `24/7 Emergency tree removal, structural trimming, stump grinding, and arborist risk assessment in ${cityName}, ${state.name}.`,
        url: canonical,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "184"
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
          { "@type": "HowToStep", name: "Step 4: On-Site Assessment", text: "Arborists conduct thorough hazard, wood decay, and rigging path assessment." },
          { "@type": "HowToStep", name: "Step 5: Safe Removal & Cleanup", text: "Execute tree removal/trimming with total property protection mats and wood chipping cleanup." }
        ]
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `What areas do you serve for tree services near ${cityName}?`,
            acceptedAnswer: { "@type": "Answer", text: `We proudly serve ${cityName} and surrounding areas including Downtown ${cityName}, North ${cityName}, South ${cityName}, East ${cityName}, West ${cityName}, and nearby communities in ${state.name}. Call ${PHONE_DISPLAY} for 24/7 service.` }
          },
          {
            "@type": "Question",
            name: `When is the best time of year to prune trees in ${cityName}?`,
            acceptedAnswer: { "@type": "Answer", text: `In ${cityName}, ${state.name}, dormant season pruning (late winter to early spring) is ideal to prevent disease transmission, encourage vigorous growth, and reduce stress on mature shade trees.` }
          },
          {
            "@type": "Question",
            name: `Do you provide 24/7 emergency storm damage tree removal in ${cityName}?`,
            acceptedAnswer: { "@type": "Answer", text: `Yes, our ISA certified arborist network operates 24 hours a day, 7 days a week for emergency storm damage clearance, fallen trees on roofs, power line hazards, and driveway clearance in ${cityName}.` }
          },
          {
            "@type": "Question",
            name: `How much does tree removal cost in ${cityName}?`,
            acceptedAnswer: { "@type": "Answer", text: `Costs in ${cityName} depend on tree height, trunk diameter, hazard proximity to structures, and crane equipment requirements. We provide flat-rate, written upfront quotes.` }
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

  const zipCardsHtml = neighborhoodZips.map(([area, sub]) => `<div class="zip-card"><span>📍</span><strong>${esc(area)}</strong><small>${esc(sub)} Area</small></div>`).join("");

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${DOMAIN}/areas-we-serve/">Areas We Serve</a> / <a href="https://${state.slug}.${DOMAIN}/">${esc(state.name)}</a> / ${esc(cityName)}</div><span class="eyebrow">ISA Certified Arborist Network</span><h1>24/7 Tree Service in <em>${esc(cityName)}, ${esc(state.name)}</em></h1><p>Our ISA certified arborists live and work in your community. Explore our complete ${services.length}-service directory for ${esc(cityName)}, review tree health assessments, and request a free arborist consultation.</p><div class="rating-badge"><span class="stars">★★★★★</span><span>Davey-Grade 4.9/5 Rating · 184+ Local Reviews</span></div>${trustChecklistHtml()}<div class="buttons"><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a><a class="btn ghost" href="#services">Browse All Services</a></div></div><div>${leadFormHtml(cityName)}</div></div></section><section class="stats"><div class="wrap"><div class="stat"><strong>${services.length}</strong><span>Tree topics</span></div><div class="stat"><strong>${state.code.toUpperCase()}</strong><span>${esc(state.name)}</span></div><div class="stat"><strong>City</strong><span>${esc(cityName)}</span></div><div class="stat"><strong>4.9 ★</strong><span>184+ Client Reviews</span></div></div></section><section class="section soft" id="neighborhoods"><div class="wrap"><div class="head"><div><span class="eyeline">Hyper-Local Coverage</span><h2>Serving ${esc(cityName)} &amp; Surrounding Neighborhoods</h2><p class="muted">Comprehensive 24/7 tree service coverage across all ${esc(cityName)} zones and nearby communities.</p></div></div><div class="zip-grid">${zipCardsHtml}</div></div></section><section class="section" id="services"><div class="wrap"><div class="head"><div><span class="eyeline">Tree services</span><h2>Services to review in ${esc(cityName)}</h2><p class="muted">Select a service topic for detailed inspection guidance and tree care options.</p></div></div><div class="grid">${serviceCards(host, true)}</div></div></section></main>`;
  return shell(`Tree Services in ${cityName}, ${state.name} | ISA Certified Arborists`, `Browse ${services.length} tree care, hazard removal, and arborist service topics for ${cityName}, ${state.name}. 24/7 emergency response.`, canonical, body, schema);
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
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
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
