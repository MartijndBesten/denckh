import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/diensten/", "/prijzen/", "/projecten/deegh/", "/projecten/okkie/", "/projecten/kerckh/", "/projecten/lyev/", "/privacy/"];
  return routes.map((route) => ({ url: `https://denckh.nl${route}`, lastModified: new Date("2026-10-17") }));
}
