import dayjs from "dayjs";

import { SITE_INFO } from "@/config/site";
import { getAllPosts } from "@/features/blog/data/posts";

export const dynamic = "force-static";

function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function GET() {
  const allPosts = getAllPosts();
  const lastBuildDate = dayjs().toISOString();

  const itemsXml = allPosts
    .map(
      (post) => {
        const title = escapeXml(post.metadata.title);
        const description = escapeXml(post.metadata.description || "");
        const link = `${SITE_INFO.url}/docs/${post.slug}`;
        const pubDate = dayjs(post.metadata.createdAt).toISOString();
        const category = post.metadata.category
          ? `<category>${escapeXml(post.metadata.category)}</category>`
          : "";

        return `<item>
          <title>${title}</title>
          <link>${link}</link>
          <description>${description}</description>
          <pubDate>${pubDate}</pubDate>
          <guid isPermaLink="true">${link}</guid>
          ${category}
        </item>`;
      }
    )
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Documentation | ${SITE_INFO.name}</title>
      <link>${SITE_INFO.url}/docs</link>
      <description>${escapeXml(SITE_INFO.description)}</description>
      <language>en-us</language>
      <lastBuildDate>${lastBuildDate}</lastBuildDate>
      <atom:link href="${SITE_INFO.url}/rss" rel="self" type="application/rss+xml" />
      ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
