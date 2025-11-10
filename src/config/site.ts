import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: "SQ3",
  title: "SQ3",
  shortName: "SQ3",
  tagline: "Unified Customer Messaging Platform for Sri Lankan SMEs",
  url: process.env.APP_URL || "https://sq3.us",
  ogImage: "/og-image.png",
  description:
    "SQ3 is a unified platform that brings all your customer messages from Facebook, Instagram, and your website into one place, and helps you respond to them faster and smarter. Designed specifically for Sri Lankan SMEs.",
  longDescription:
    "SQ3 is an AI-powered unified customer messaging platform designed specifically for Sri Lankan small and medium enterprises (SMEs). Connect all your customer conversations from Facebook Messenger, Instagram Direct Messages, and your website into a single, intelligent inbox. Our platform features advanced AI capabilities including sentiment analysis, intent classification, automated appointment booking, and marketing segmentation to help you respond faster and smarter to your customers.",
  keywords: [
    // Primary keywords
    "SQ3",
    "unified inbox",
    "customer messaging platform",
    "customer engagement",
    "multi-channel messaging",
    // Platform-specific
    "Facebook Messenger integration",
    "Instagram Direct Messages",
    "website chat integration",
    "social media management",
    // AI & Automation
    "AI chatbot",
    "artificial intelligence",
    "sentiment analysis",
    "intent classification",
    "marketing automation",
    "customer service automation",
    "automated appointment booking",
    "marketing segmentation",
    // Target market
    "Sri Lanka",
    "Sri Lankan SMEs",
    "small and medium enterprises",
    "SME software",
    "Sri Lankan businesses",
    // Business type
    "SaaS",
    "software as a service",
    "business communication",
    "customer support software",
    "CRM integration",
    // Features
    "unified inbox",
    "multi-channel support",
    "real-time messaging",
    "customer analytics",
    "response automation",
    // Related terms
    "business messaging",
    "social commerce",
    "customer relationship management",
    "digital customer service",
    "omnichannel communication",
  ],
  category: "Business Software",
  language: "en",
  locale: "en_US",
  country: "LK",
  author: {
    name: "thevinduw",
    url: "https://sq3.us",
  },
  publisher: {
    name: "SQ3",
    url: "https://sq3.us",
  },
  contact: {
    email: "info@sq3.us",
    website: "https://sq3.us",
  },
  social: {
    twitter: "@thevinduw",
    github: "thevinduw",
  },
  // SEO metadata
  seo: {
    defaultTitle:
      "SQ3 - Unified Customer Messaging Platform for Sri Lankan SMEs",
    titleTemplate: "%s | SQ3",
    defaultDescription:
      "SQ3 is a unified platform that brings all your customer messages from Facebook, Instagram, and your website into one place, and helps you respond to them faster and smarter. Designed specifically for Sri Lankan SMEs.",
    defaultImage: "/og-image.png",
    siteName: "SQ3",
    twitterHandle: "@thevinduw",
    twitterCardType: "summary_large_image",
    locale: "en_US",
  },
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

// Additional SEO configuration
export const SEO_CONFIG = {
  // Robots configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
  // Verification codes (add your actual verification codes here)
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    bing: process.env.BING_VERIFICATION,
    // Add other verification codes as needed
  },
  // Additional meta tags
  additionalMetaTags: [
    {
      name: "application-name",
      content: SITE_INFO.name,
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "default",
    },
    {
      name: "apple-mobile-web-app-title",
      content: SITE_INFO.shortName,
    },
    {
      name: "format-detection",
      content: "telephone=no",
    },
    {
      name: "mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "msapplication-TileColor",
      content: META_THEME_COLORS.light,
    },
    {
      name: "msapplication-config",
      content: "/browserconfig.xml",
    },
    {
      name: "theme-color",
      content: META_THEME_COLORS.light,
    },
  ],
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
