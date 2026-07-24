import database from "../data/usa_database.json";
import services from "../data/services.json";
import { cityPage, localServicePage, notFoundPage, statePage, staticPage } from "./locationTemplates";
import { coreSitemap, sitemapIndex, stateSitemap, type StateItem } from "./sitemaps";
import { SITE } from "../lib/site";

type Env = { ASSETS: { fetch(input: Request | string): Promise<Response> } };
type Ctx = { waitUntil(promise: Promise<unknown>): void };

const DOMAIN = SITE.domain;
const STATES = database.states as StateItem[];
const STATE_BY_SLUG = new Map(STATES.map((s) => [s.slug.toLowerCase(), s]));
const STATE_SLUGS = STATES.map((s) => s.slug.toLowerCase()).sort((a, b) => b.length - a.length);

function parseSubdomain(subdomain: string): { state: StateItem; city?: [string, string] } | null {
  const sub = subdomain.toLowerCase();
  const directState = STATE_BY_SLUG.get(sub);
  if (directState) return { state: directState };

  const stateSlug = STATE_SLUGS.find((slug) => sub.endsWith(`-${slug}`));
  if (!stateSlug) return null;

  const state = STATE_BY_SLUG.get(stateSlug)!;
  const citySlug = sub.slice(0, -(stateSlug.length + 1));
  const city = state.cities.find(([slug]) => slug.toLowerCase() === citySlug);
  return city ? { state, city } : null;
}

function htmlResponse(html: string, method = "GET", status = 200, extra: Record<string, string> = {}) {
  const bytes = new TextEncoder().encode(html);
  return new Response(method === "HEAD" ? null : bytes, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "content-length": String(bytes.byteLength),
      "cache-control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      "x-content-type-options": "nosniff",
      ...extra,
    },
  });
}

function notFound(message: string, method = "GET") {
  return htmlResponse(notFoundPage(message), method, 404, { "x-robots-tag": "noindex" });
}

function redirect(url: string, status = 308) {
  return Response.redirect(url, status);
}

async function cached(request: Request, ctx: Ctx, render: () => Response) {
  if (request.method === "HEAD") return render();
  const cache = (caches as CacheStorage & { default: Cache }).default;
  const hit = await cache.match(request);
  if (hit && hit.status === 200) return hit;
  const result = render();
  if (result.status === 200) ctx.waitUntil(cache.put(request, result.clone()));
  return result;
}

const STATIC_PAGES: Record<string, { title: string; html: string }> = {
  "/about/": {
    title: "About Us",
    html: `<h2>About ${SITE.name}</h2><p>${SITE.name} is an independent certified arborist information and tree service referral network serving communities across all 50 states. We connect property owners with independent, qualified local tree removal specialists, stump grinding technicians, and certified arborists.</p>`,
  },
  "/contact/": {
    title: "Contact Us",
    html: `<h2>Contact Referral Dispatch</h2><p>For immediate emergency tree removal or service inquiries, call our 24/7 arborist hotline at <strong>${SITE.phoneDisplay}</strong>.</p>`,
  },
  "/privacy-policy/": {
    title: "Privacy Policy",
    html: `<h2>Privacy Policy</h2><p>Your privacy is important to us. Information collected through phone inquiries or form submissions is strictly utilized to connect property owners with independent local tree service providers. We do not sell or lease personal data to unauthorized third parties.</p>`,
  },
  "/terms/": {
    title: "Terms of Use",
    html: `<h2>Terms of Use</h2><p>By using ${SITE.name}, you acknowledge that this website operates as an informational directory and referral service. All service contractors are independent businesses responsible for their own licensing, insurance, and performance.</p>`,
  },
  "/disclaimer/": {
    title: "Legal Disclaimer",
    html: `<h2>Legal Disclaimer</h2><p>The information on this website is for educational and promotional purposes. Property owners should verify contractor credentials, licensing, insurance coverage, and written estimates prior to authorizing heavy tree removal work.</p>`,
  },
  "/provider-disclosure/": {
    title: "Independent Provider Disclosure",
    html: `<h2>Provider Disclosure</h2><p>Providers listed or referred through ${SITE.name} operate independently. ${SITE.name} does not directly employ contractors or perform tree removal services. Always request proof of liability insurance and workers' compensation.</p>`,
  },
  "/accessibility/": {
    title: "Accessibility Statement",
    html: `<h2>Web Accessibility Statement</h2><p>${SITE.name} is committed to digital accessibility compliant with WCAG 2.1 AA standards. If you encounter any accessibility issues, please contact us for immediate assistance.</p>`,
  },
};

export default {
  async fetch(request: Request, env: Env, ctx: Ctx): Promise<Response> {
    if (!["GET", "HEAD"].includes(request.method)) return new Response("Method Not Allowed", { status: 405 });

    const url = new URL(request.url);
    const hostname = url.hostname.toLowerCase();
    const path = url.pathname;
    const method = request.method;

    if (hostname === `www.${DOMAIN}`) {
      url.hostname = DOMAIN;
      return redirect(url.toString());
    }

    if (hostname === DOMAIN || hostname.endsWith(".workers.dev")) {
      if (path === "/robots.txt") {
        const body = `User-agent: *\nAllow: /\nSitemap: https://${DOMAIN}/sitemap.xml\n`;
        return new Response(method === "HEAD" ? null : body, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, s-maxage=86400",
            "content-length": String(new TextEncoder().encode(body).byteLength),
          },
        });
      }

      if (path === "/sitemap.xml") return cached(request, ctx, () => sitemapIndex(STATES, method));
      if (path === "/sitemaps/core.xml") return cached(request, ctx, () => coreSitemap(STATES, method));

      const sitemapMatch = path.match(/^\/sitemaps\/(.+)-(\d+)\.xml$/);
      if (sitemapMatch) {
        const stateSlug = sitemapMatch[1].toLowerCase();
        const state = STATE_BY_SLUG.get(stateSlug) || STATES.find((s) => s.code.toLowerCase() === stateSlug);
        if (!state) return new Response("Not Found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
        const sitemap = stateSitemap(state, Number(sitemapMatch[2]), method);
        if (!sitemap) return new Response("Not Found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
        return cached(request, ctx, () => sitemap);
      }

      const staticInfo = STATIC_PAGES[path] || (path.endsWith("/") ? null : STATIC_PAGES[`${path}/`]);
      if (staticInfo) {
        if (!path.endsWith("/")) return redirect(`https://${DOMAIN}${path}/`);
        return cached(request, ctx, () => htmlResponse(staticPage(staticInfo.title, path, staticInfo.html), method));
      }

      return env.ASSETS.fetch(request);
    }

    if (!hostname.endsWith(`.${DOMAIN}`)) return notFound("This hostname is not configured.", method);

    if (path.startsWith("/_next/") || /\.[a-z0-9]{2,8}$/i.test(path)) {
      url.hostname = DOMAIN;
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }

    if (path === "/robots.txt" || path === "/sitemap.xml" || path.startsWith("/sitemaps/")) {
      return redirect(`https://${DOMAIN}${path}`);
    }

    const subdomain = hostname.slice(0, -(DOMAIN.length + 1));
    const location = parseSubdomain(subdomain);
    if (!location) return notFound("This tree service location route could not be found.", method);

    if (!location.city) {
      if (path !== "/") return redirect(`https://${hostname}/`);
      return cached(request, ctx, () => htmlResponse(statePage(location.state, hostname), method));
    }

    if (path !== "/" && !path.endsWith("/")) {
      url.pathname = `${path}/`;
      return redirect(url.toString());
    }

    const routeParts = path.split("/").filter(Boolean);
    if (routeParts.length === 0) {
      return cached(request, ctx, () => htmlResponse(cityPage(location.state, location.city!, hostname), method));
    }
    if (routeParts.length > 1) return notFound("This local route could not be found.", method);

    const service = services.find((item) => item.slug === routeParts[0]);
    if (!service) return notFound("This tree service topic could not be found.", method);

    return cached(request, ctx, () => htmlResponse(localServicePage(location.state, location.city!, service, hostname), method));
  },
};
