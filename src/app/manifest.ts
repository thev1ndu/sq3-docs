import type { MetadataRoute } from "next";

import { META_THEME_COLORS, SITE_INFO } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_INFO.name,
    short_name: SITE_INFO.shortName,
    description: SITE_INFO.description,
    id: "/?utm_source=pwa",
    start_url: "/?utm_source=pwa",
    display: "standalone",
    scope: "/",
    orientation: "portrait-primary",
    theme_color: META_THEME_COLORS.light,
    background_color: META_THEME_COLORS.light,
    categories: ["business", "productivity", "communication"],
    lang: SITE_INFO.language,
    dir: "ltr",
    icons: [
      {
        src: "/Q.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/Q.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: SITE_INFO.ogImage,
        sizes: "1200x630",
        type: "image/png",
        label: SITE_INFO.name,
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}
