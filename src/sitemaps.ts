import servicesData from "../data/services.json";
import articlesData from "../data/articles.json";
import database from "../data/usa_database.json";
import { SITE } from "../lib/site";
import { getServicesForState } from "./locationTemplates";

const DOMAIN = SITE.domain;
export const SITEMAP_LIMIT = 2000;
const TODAY = new Date().toISOString().split("T")[0];

export type StateItem = (typeof database.states)[number];

function xml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[char] || char);
}

function xmlResponse(body: string, method = "GET") {
  const bytes = new TextEncoder().encode(body);
  return new Response(method === "HEAD" ? null : bytes, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "content-length": String(bytes.byteLength),
      "cache-control": "public, max-age=86400, s-maxage=604800",
      "x-content-type-options": "nosniff",
      "access-control-allow-origin": "*",
    },
  });
}

export function sitemapIndex(states: StateItem[], method = "GET") {
  const entries = [`https://${DOMAIN}/sitemaps/core.xml`];
  for (const state of states) {
    const allowedServices = getServicesForState(state.code);
    const urlsPerCity = allowedServices.length + 1;
    const chunks = Math.ceil((state.cities.length * urlsPerCity) / SITEMAP_LIMIT);
    for (let chunk = 1; chunk <= chunks; chunk++) {
      // Matches Google Search Console submitted URL structure (e.g. /sitemaps/wisconsin-1.xml)
      entries.push(`https://${DOMAIN}/sitemaps/${state.slug}-${chunk}.xml`);
    }
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((loc) => `  <sitemap>\n    <loc>${xml(loc)}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </sitemap>`).join("\n")}
</sitemapindex>`;
  return xmlResponse(body, method);
}

export function coreSitemap(states: StateItem[], method = "GET") {
  const corePaths = [
    "/",
    "/about/",
    "/articles/",
    "/services/",
    "/locations/",
    "/areas-we-serve/",
    "/contact/",
    "/privacy-policy/",
    "/terms/",
    "/disclaimer/",
  ];
  const urls = [
    ...corePaths.map((path) => `https://${DOMAIN}${path}`),
    ...servicesData.map((service) => `https://${DOMAIN}/services/${service.slug}/`),
    ...articlesData.map((article) => `https://${DOMAIN}/articles/${article.slug}/`),
    ...states.map((state) => `https://${state.slug}.${DOMAIN}/`),
  ];
  return sitemapUrlset(urls, method, "1.0");
}

export function stateSitemap(state: StateItem, chunk: number, method = "GET") {
  if (!Number.isInteger(chunk) || chunk < 1) return null;
  const allowedServices = getServicesForState(state.code);
  const urlsPerCity = allowedServices.length + 1;
  
  const start = (chunk - 1) * SITEMAP_LIMIT;
  const total = state.cities.length * urlsPerCity;
  if (start >= total) return null;
  const end = Math.min(total, start + SITEMAP_LIMIT);
  const urls: string[] = [];

  for (let index = start; index < end; index++) {
    const cityIndex = Math.floor(index / urlsPerCity);
    const pageIndex = index % urlsPerCity;
    const city = state.cities[cityIndex];
    const host = `${city[0]}-${state.slug}.${DOMAIN}`;
    urls.push(pageIndex === 0 ? `https://${host}/` : `https://${host}/${allowedServices[pageIndex - 1].slug}/`);
  }
  return sitemapUrlset(urls, method, "0.8");
}

function sitemapUrlset(urls: string[], method = "GET", priority = "0.8") {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((loc) => `  <url>\n    <loc>${xml(loc)}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`).join("\n")}
</urlset>`;
  return xmlResponse(body, method);
}
