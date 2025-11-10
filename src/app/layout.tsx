import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type {
  Organization,
  SoftwareApplication,
  WebSite,
  WithContext,
} from "schema-dts";

import { Providers } from "@/components/providers";
import {
  META_THEME_COLORS,
  SEO_CONFIG,
  SITE_INFO,
} from "@/config/site";
import { fontMono, fontSans } from "@/lib/fonts";

function getWebSiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_INFO.name,
    url: SITE_INFO.url,
    alternateName: [SITE_INFO.shortName],
    description: SITE_INFO.description,
    inLanguage: SITE_INFO.language,
    publisher: {
      "@type": "Organization",
      name: SITE_INFO.publisher.name,
      url: SITE_INFO.publisher.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_INFO.url}/search?q={search_term_string}`,
      },
    },
  };
}

function getOrganizationJsonLd(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_INFO.name,
    url: SITE_INFO.url,
    logo: `${SITE_INFO.url}${SITE_INFO.ogImage}`,
    description: SITE_INFO.description,
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE_INFO.contact.email,
      contactType: "customer service",
    },
    sameAs: [
      SITE_INFO.social.twitter
        ? `https://twitter.com/${SITE_INFO.social.twitter.replace("@", "")}`
        : "",
      SITE_INFO.social.github
        ? `https://github.com/${SITE_INFO.social.github}`
        : "",
    ].filter(Boolean),
  };
}

function getSoftwareApplicationJsonLd(): WithContext<SoftwareApplication> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_INFO.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: SITE_INFO.description,
    url: SITE_INFO.url,
    author: {
      "@type": "Organization",
      name: SITE_INFO.author.name,
      url: SITE_INFO.author.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_INFO.publisher.name,
      url: SITE_INFO.publisher.url,
    },
    featureList: [
      "Unified inbox for multiple messaging channels",
      "Facebook Messenger integration",
      "Instagram Direct Messages integration",
      "Website chat integration",
      "AI-powered sentiment analysis",
      "Intent classification",
      "Automated appointment booking",
      "Marketing segmentation",
      "Real-time messaging",
      "Customer analytics",
    ],
    screenshot: `${SITE_INFO.url}${SITE_INFO.ogImage}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "10",
    },
  };
}

// Thanks @shadcn-ui, @tailwindcss
const darkModeScript = String.raw`
  try {
    if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
    }
  } catch (_) {}

  try {
    if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
      document.documentElement.classList.add('os-macos')
    }
  } catch (_) {}
`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_INFO.url),
  title: {
    template: SITE_INFO.seo.titleTemplate,
    default: SITE_INFO.seo.defaultTitle,
  },
  description: SITE_INFO.seo.defaultDescription,
  keywords: SITE_INFO.keywords,
  authors: [
    {
      name: SITE_INFO.author.name,
      url: SITE_INFO.author.url,
    },
  ],
  creator: SITE_INFO.author.name,
  publisher: SITE_INFO.publisher.name,
  category: SITE_INFO.category,
  classification: SITE_INFO.category,
  alternates: {
    canonical: "/",
    languages: {
      [SITE_INFO.language]: SITE_INFO.url,
    },
  },
  openGraph: {
    type: "website",
    locale: SITE_INFO.seo.locale,
    url: SITE_INFO.url,
    siteName: SITE_INFO.seo.siteName,
    title: SITE_INFO.seo.defaultTitle,
    description: SITE_INFO.seo.defaultDescription,
    images: [
      {
        url: SITE_INFO.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_INFO.name,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: SITE_INFO.seo.twitterCardType as "summary_large_image",
    site: SITE_INFO.seo.twitterHandle,
    creator: SITE_INFO.seo.twitterHandle,
    title: SITE_INFO.seo.defaultTitle,
    description: SITE_INFO.seo.defaultDescription,
    images: [
      {
        url: SITE_INFO.ogImage,
        alt: SITE_INFO.name,
      },
    ],
  },
  robots: SEO_CONFIG.robots,
  icons: {
    icon: [
      { url: "/Q.png", sizes: "any" },
      { url: "/Q.png", type: "image/png" },
    ],
    apple: [
      { url: "/Q.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/Q.svg",
        color: META_THEME_COLORS.light,
      },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_INFO.shortName,
  },
  applicationName: SITE_INFO.name,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Add verification meta tags if available
  ...(SEO_CONFIG.verification.google ||
  SEO_CONFIG.verification.yandex ||
  SEO_CONFIG.verification.bing
    ? {
        verification: {
          ...(SEO_CONFIG.verification.google && {
            google: SEO_CONFIG.verification.google,
          }),
          ...(SEO_CONFIG.verification.yandex && {
            yandex: SEO_CONFIG.verification.yandex,
          }),
          ...(SEO_CONFIG.verification.bing && {
            other: {
              "msvalidate.01": SEO_CONFIG.verification.bing,
            },
          }),
        },
      }
    : {}),
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": SITE_INFO.shortName,
    "application-name": SITE_INFO.name,
    "msapplication-TileColor": META_THEME_COLORS.light,
    "theme-color": META_THEME_COLORS.light,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: META_THEME_COLORS.light,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={SITE_INFO.language}
      className={`${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: darkModeScript }}
        />
        {/*
          Thanks @tailwindcss. We inject the script via the `<Script/>` tag again,
          since we found the regular `<script>` tag to not execute when rendering a not-found page.
         */}
        <Script src={`data:text/javascript;base64,${btoa(darkModeScript)}`} />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-KP0TB41PTP"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KP0TB41PTP');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationJsonLd()).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSoftwareApplicationJsonLd()).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
      </head>

      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
