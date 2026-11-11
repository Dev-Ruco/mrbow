import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mrbow.co.mz";
  const routes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/historia", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/discografia", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/videos", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/espectaculos", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/privacidade", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/termos", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/cookies", priority: 0.2, changeFrequency: "yearly" as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: new URL(path, baseUrl).toString(),
    priority,
    changeFrequency,
  }));
}
