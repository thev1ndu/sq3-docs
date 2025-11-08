import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: "SQ3",
  url: process.env.APP_URL || "https://next.sq3.uk",
  ogImage: "/og-image.png",
  description:
    "Unified, AI-driven SaaS platform that simplifies customer engagement, automates responses, and enhances marketing outcomes across Facebook, Instagram, and websites for Sri Lankan SMEs.",
  keywords: [
    "SQ3",
    "chatbot",
    "SaaS",
    "Facebook",
    "Instagram",
    "website integration",
    "customer engagement",
    "AI",
    "sentiment analysis",
    "intent classification",
    "Sri Lanka",
    "SME",
    "marketing automation",
    "unified inbox",
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
