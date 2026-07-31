import articles from "../data/articles.json";
import services from "../data/services.json";
import usaLocations from "../data/usa_database.json";
import {
  aboutUsPage,
  areasWeServePage,
  articlePage,
  articlesHubPage,
  cityPage,
  contactUsPage,
  disclaimerPage,
  homePage,
  infoPage,
  localServicePage,
  nationalServicePage,
  notFoundPage,
  privacyPolicyPage,
  servicesHubPage,
  statePage,
  termsOfServicePage,
  type StateItem,
} from "./locationTemplates";
import { coreSitemap, sitemapIndex, stateSitemap } from "./sitemaps";

type Env = { ASSETS: { fetch(input: Request | string): Promise<Response> } };
type Context = { waitUntil(promise: Promise<unknown>): void };

const DOMAIN = "cantreeservice.com";

const rawStates = (usaLocations as any).states || [];
const states: StateItem[] = rawStates.map((s: any) => ({
  code: s.code || "",
  name: s.name || "",
  slug: s.slug || (s.name || "").toLowerCase().replace(/\s+/g, "-"),
  cities: (s.cities || []).map((c: any) => [
    c.slug || (c.name || "").toLowerCase().replace(/\s+/g, "-"),
    c.name || "",
  ]),
}));

const STATE_BY_SLUG = new Map<string, StateItem>();
states.forEach((st) => STATE_BY_SLUG.set(st.slug, st));
const STATE_SLUGS = Array.from(STATE_BY_SLUG.keys());

function htmlResponse(html: string, method = "GET", status = 200, extra: Record<string, string> = {}) {
  const bytes = new TextEncoder().encode(html);
  return new Response(method === "HEAD" ? null : bytes, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "content-length": String(bytes.byteLength),
      "cache-control": "no-cache, no-store, must-revalidate",
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

async function cached(request: Request, ctx: Context, render: () => Response) {
  if (request.method === "HEAD") return render();
  return render();
}

export default {
  async fetch(request: Request, env: Env, ctx: Context): Promise<Response> {
    const method = request.method;
    if (method !== "GET" && method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const url = new URL(request.url);
    const hostname = url.hostname.toLowerCase();
    const path = url.pathname;

    if (hostname === DOMAIN || hostname === `www.${DOMAIN}`) {
      if (path === "/") {
        return cached(request, ctx, () => htmlResponse(homePage(states), method));
      }
      if (path === "/sitemap.xml") {
        return cached(request, ctx, () => htmlResponse(sitemapIndex(states), method, 200, { "content-type": "application/xml" }));
      }
      if (path.startsWith("/sitemaps/") && path.endsWith(".xml")) {
        const filename = path.slice("/sitemaps/".length, -".xml".length);
        if (filename === "core") {
          return cached(request, ctx, () => coreSitemap(states, method));
        }
        const parts = filename.replace(/^state-/, "").split("-");
        let chunk = 1;
        if (parts.length > 1 && /^\d+$/.test(parts[parts.length - 1])) {
          chunk = parseInt(parts.pop()!, 10);
        }
        const stateSlug = parts.join("-");
        const state = STATE_BY_SLUG.get(stateSlug);
        if (state) {
          const sm = stateSitemap(state, chunk, method);
          if (sm) return sm;
        }
      }
      if (path === "/robots.txt") {
        const txt = `User-agent: *\nAllow: /\n\nSitemap: https://${DOMAIN}/sitemap.xml\n`;
        return htmlResponse(txt, method, 200, { "content-type": "text/plain" });
      }

      if (path === "/services" || path === "/services/") {
        return cached(request, ctx, () => htmlResponse(servicesHubPage(), method));
      }

      if (path.startsWith("/services/")) {
        const slug = path.split("/")[2];
        const service = services.find((s: any) => s.slug === slug);
        if (service) {
          return cached(request, ctx, () => htmlResponse(nationalServicePage(service), method));
        }
      }

      if (path === "/areas-we-serve" || path === "/areas-we-serve/" || path === "/locations" || path === "/locations/") {
        return cached(request, ctx, () => htmlResponse(areasWeServePage(states), method));
      }

      if (path === "/articles" || path === "/articles/") {
        return cached(request, ctx, () => htmlResponse(articlesHubPage(), method));
      }

      if (path.startsWith("/articles/")) {
        const slug = path.split("/")[2];
        const article = articles.find((a: any) => a.slug === slug);
        if (article) {
          return cached(request, ctx, () => htmlResponse(articlePage(article), method));
        }
      }

      if (path === "/about" || path === "/about/") {
        return cached(request, ctx, () => htmlResponse(aboutUsPage(), method));
      }

      if (path === "/contact" || path === "/contact/") {
        return cached(request, ctx, () => htmlResponse(contactUsPage(), method));
      }

      if (path === "/privacy-policy" || path === "/privacy-policy/") {
        return cached(request, ctx, () => htmlResponse(privacyPolicyPage(), method));
      }

      if (path === "/terms" || path === "/terms/" || path === "/terms-of-service" || path === "/terms-of-service/") {
        return cached(request, ctx, () => htmlResponse(termsOfServicePage(), method));
      }

      if (path === "/disclaimer" || path === "/disclaimer/") {
        return cached(request, ctx, () => htmlResponse(disclaimerPage(), method));
      }

      return env.ASSETS.fetch(request);
    }

    if (!hostname.endsWith(`.${DOMAIN}`)) return notFound("This hostname is not configured.", method);

    const sub = hostname.slice(0, -(DOMAIN.length + 1));
    const stateMatch = STATE_BY_SLUG.get(sub);

    if (stateMatch) {
      if (path === "/") {
        return cached(request, ctx, () => htmlResponse(statePage(stateMatch), method));
      }
      if (path.length > 1) {
        const slug = path.slice(1).replace(/\/$/, "");
        const service = services.find((s: any) => s.slug === slug);
        if (service) {
          return cached(request, ctx, () => htmlResponse(nationalServicePage(service), method));
        }
      }
    }

    const stateSlug = STATE_SLUGS.find((s) => sub.endsWith(`-${s}`));
    if (stateSlug) {
      const state = STATE_BY_SLUG.get(stateSlug)!;
      const citySlug = sub.slice(0, -(stateSlug.length + 1));
      const city = state.cities.find(([slug]) => slug === citySlug);
      if (city) {
        if (path === "/") {
          return cached(request, ctx, () => htmlResponse(cityPage(state, city, hostname), method));
        }
        const slug = path.slice(1).replace(/\/$/, "");
        const service = services.find((s: any) => s.slug === slug);
        if (service) {
          return cached(request, ctx, () => htmlResponse(localServicePage(state, city, service, hostname), method));
        }
      }
    }

    return notFound("The requested local page was not found.", method);
  },
};
