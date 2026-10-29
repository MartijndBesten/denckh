import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/diensten/", "/prijzen/", "/projecten/", "/projecten/deegh/", "/projecten/okkie/", "/projecten/kerckh/", "/projecten/lyev/", "/ouderhulp/", "/privacy/"];
  // inhoudelijk gewijzigd na 17-10: homepage en projecten (B-089), Deegh-teksten (B-091)
  const changed: Record<string, string> = { "": "2026-10-23", "/projecten/": "2026-10-23", "/projecten/deegh/": "2026-10-23", "/ouderhulp/": "2026-10-29" };
  return routes.map((route) => ({ url: `https://denckh.nl${route}`, lastModified: new Date(changed[route] ?? "2026-10-17") }));
}
