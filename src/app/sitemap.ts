import dayjs from "dayjs";
import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";
import { getPostsByCategory } from "@/features/blog/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const featurePosts = getPostsByCategory("features");
  const projectPosts = getPostsByCategory("project");

  // Main pages with high priority
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: SITE_INFO.url,
      lastModified: dayjs().toISOString(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_INFO.url}/docs`,
      lastModified: dayjs().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Feature documentation pages (high priority)
  const featurePages: MetadataRoute.Sitemap = featurePosts.map((post) => ({
    url: `${SITE_INFO.url}/docs/${post.slug}`,
    lastModified: dayjs(post.metadata.updatedAt || post.metadata.createdAt).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Project documentation pages (high priority)
  const projectPages: MetadataRoute.Sitemap = projectPosts.map((post) => ({
    url: `${SITE_INFO.url}/docs/${post.slug}`,
    lastModified: dayjs(post.metadata.updatedAt || post.metadata.createdAt).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Additional important pages
  const additionalPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_INFO.url}/rss`,
      lastModified: dayjs().toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.5,
    },
  ];

  return [...mainPages, ...featurePages, ...projectPages, ...additionalPages];
}
