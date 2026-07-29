import database from "../data/usa_database.json";
import services from "../data/services.json";
import articles from "../data/articles.json";
import {
  areasWeServePage,
  articlePage,
  articlesHubPage,
  cityPage,
  homePage,
  infoPage,
  localServicePage,
  nationalServicePage,
  notFoundPage,
  servicesHubPage,
  statePage,
  linkSheetPage,
} from "./locationTemplates";
import { coreSitemap, sitemapIndex, stateSitemap, type StateItem } from "./sitemaps";
import { SITE } from "../lib/site";

type Env = { ASSETS: { fetch(input: Request | string): Promise<Response> } };
type Ctx = { waitUntil(promise: Promise<unknown>): void };

const DOMAIN = SITE.domain;
const rawStates = (database as any).states || [];

function getStateSlug(state: any): string {
  if (state.slug) return state.slug.toLowerCase();
  if (state.name) return state.name.toLowerCase().replace(/\s+/g, "-");
  if (state.code) return state.code.toLowerCase();
  return "";
}

const STATES: StateItem[] = rawStates.map((s: any) => {
  const slug = getStateSlug(s);
  const cities: [string, string][] = (s.cities || []).map((c: any) => {
    if (Array.isArray(c)) return [c[0], c[1]];
    return [c.slug || c.name.toLowerCase().replace(/\s+/g, "-"), c.name];
  });
  return { ...s, slug, cities };
});

const STATE_BY_SLUG = new Map(STATES.map((s) => [s.slug, s]));
const STATE_SLUGS = STATES.map((s) => s.slug).filter(Boolean).sort((a, b) => b.length - a.length);

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

export default {
  async fetch(request: Request, env: Env, ctx: Ctx): Promise<Response> {
    if (!["GET", "HEAD"].includes(request.method)) return new Response("Method Not Allowed", { status: 405 });

    const url = new URL(request.url);
    const hostname = url.hostname.toLowerCase();
    const path = url.pathname;
    const method = request.method;

    if (url.protocol === "http:" && !url.hostname.includes("localhost")) {
      url.protocol = "https:";
      return new Response(null, { status: 301, headers: { Location: url.toString() } });
    }

    if (hostname === `www.${DOMAIN}`) {
      url.hostname = DOMAIN;
      return redirect(url.toString());
    }

    if (hostname === DOMAIN || hostname.endsWith(".workers.dev")) {
      if (path === "/" || path === "") {
        return cached(request, ctx, () => htmlResponse(homePage(STATES), method));
      }

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

      if (path === "/services" || path === "/services/") {
        return cached(request, ctx, () => htmlResponse(servicesHubPage(), method));
      }

      if (path === "/link-sheet" || path === "/link-sheet/") {
        return cached(request, ctx, () => htmlResponse(linkSheetPage(), method));
      }

      if (path.startsWith("/services/")) {
        const slug = path.split("/")[2];
        const service = services.find((s) => s.slug === slug);
        if (service) {
          return cached(request, ctx, () => htmlResponse(nationalServicePage(service as any), method));
        }
      }

      if (path === "/areas-we-serve" || path === "/areas-we-serve/" || path === "/locations" || path === "/locations/") {
        return cached(request, ctx, () => htmlResponse(areasWeServePage(STATES), method));
      }

      if (path === "/articles" || path === "/articles/") {
        return cached(request, ctx, () => htmlResponse(articlesHubPage(), method));
      }

      if (path.startsWith("/articles/")) {
        const slug = path.split("/")[2];
        const article = (articles as any[]).find((a) => a.slug === slug);
        if (article) {
          return cached(request, ctx, () => htmlResponse(articlePage(article), method));
        }
      }

      const infoPages: Record<string, string> = {
        "/about": `About ${SITE.name}`,
        "/about/": `About ${SITE.name}`,
        "/contact": "Contact Us",
        "/contact/": "Contact Us",
        "/privacy-policy": "Privacy Policy",
        "/privacy-policy/": "Privacy Policy",
        "/terms": "Terms of Use",
        "/terms/": "Terms of Use",
        "/provider-disclosure": "Provider Disclosure",
        "/provider-disclosure/": "Provider Disclosure",
        "/accessibility": "Accessibility Statement",
        "/accessibility/": "Accessibility Statement",
        "/disclaimer": "Legal Disclaimer",
        "/disclaimer/": "Legal Disclaimer",
      };

      if (infoPages[path]) {
        const title = infoPages[path];
        const content = `<p>Welcome to ${title} on ${SITE.name}. We provide independent certified arborist information, tree service routing, and provider referral information across all 50 US states.</p><p>For inquiries, call <strong>${SITE.phoneDisplay}</strong>.</p>`;
        return cached(request, ctx, () => htmlResponse(infoPage(title, content, path), method));
      }

      const parts = path.split("/").filter(Boolean);
      const locationPrefix = parts[0] === "locations" || parts[0] === "areas-we-serve";

      if (locationPrefix && parts[1] && STATE_BY_SLUG.has(parts[1])) {
        const state = STATE_BY_SLUG.get(parts[1])!;
        const citySlug = parts[2];
        if (citySlug && state.cities.some(([slug]) => slug === citySlug)) {
          url.hostname = `${citySlug}-${state.slug}.${DOMAIN}`;
          url.pathname = parts[3] ? `/${parts.slice(3).join("/")}/` : "/";
        } else {
          url.hostname = `${state.slug}.${DOMAIN}`;
          url.pathname = "/";
        }
        return redirect(url.toString());
      }

      if (parts[0] && STATE_BY_SLUG.has(parts[0])) {
        const state = STATE_BY_SLUG.get(parts[0])!;
        const citySlug = parts[1];
        url.hostname = citySlug && state.cities.some(([slug]) => slug === citySlug)
          ? `${citySlug}-${state.slug}.${DOMAIN}`
          : `${state.slug}.${DOMAIN}`;
        url.pathname = parts[2] ? `/${parts.slice(2).join("/")}/` : "/";
        return redirect(url.toString());
      }

      return env.ASSETS.fetch(request);
    }

    if (!hostname.endsWith(`.${DOMAIN}`)) return notFound("This hostname is not configured.", method);

    if (path.startsWith("/_next/") || path.startsWith("/images/") || /\.[a-z0-9]{2,8}$/i.test(path)) {
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

    return cached(request, ctx, () => htmlResponse(localServicePage(location.state, location.city!, service as any, hostname), method));
  },
};
