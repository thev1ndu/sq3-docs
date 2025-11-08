import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: "SQ3",
  url: process.env.APP_URL || "https://next.sq3.uk",
  ogImage: "/og-image.png",
  description:
    "Unified, AI-driven SaaS platform that simplifies customer engagement, automates responses, and enhances marketing outcomes within the Meta ecosystem for Sri Lankan SMEs.",
  keywords: [
    "SQ3",
    "chatbot",
    "SaaS",
    "Facebook",
    "Instagram",
    "customer engagement",
    "AI",
    "Sri Lanka",
    "SME",
    "marketing automation",
  ],
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const MAIN_NAV: NavItem[] = [
  {
    title: "Project",
    href: "/",
  },
  {
    title: "Docs",
    href: "/docs",
  },
];

export const UTM_PARAMS = {
  utm_source: "sq3.thevinduw.de",
  utm_medium: "project_website",
  utm_campaign: "referral",
};
