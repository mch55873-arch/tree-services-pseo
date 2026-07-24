import database from "../data/usa_database.json";
import services from "../data/services.json";
import { cityPage, localServicePage, notFoundPage, statePage } from "./locationTemplates";
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
