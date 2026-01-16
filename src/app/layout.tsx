import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tysonstechsolutions.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Web Development, AI Chatbots & Custom Software | TysonsTechSolutions",
    template: "%s | TysonsTechSolutions",
  },
  description: "Custom web development, AI chatbots, and software solutions for businesses. We build technology that grows your business. Get a free consultation today.",
  keywords: [
    "web development company",
    "custom website design",
    "AI chatbot development",
    "custom software development",
    "business technology solutions",
    "web application development",
    "mobile app development",
    "SEO services",
    "digital marketing agency",
    "ecommerce development",
    "UI UX design",
    "cloud solutions",
    "API development",
    "IT consulting",
  ],
  authors: [{ name: "TysonsTechSolutions" }],
  creator: "TysonsTechSolutions",
  publisher: "TysonsTechSolutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "NwNGXMqNohlaCz3_ADjb17Hyk5Z0bquaG0lTeygWSP8",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "TysonsTechSolutions",
    title: "Web Development, AI Chatbots & Custom Software | TysonsTechSolutions",
    description: "Custom web development, AI chatbots, and software solutions for businesses. We build technology that grows your business.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TysonsTechSolutions - Technology Solutions for Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development, AI Chatbots & Custom Software | TysonsTechSolutions",
    description: "Custom web development, AI chatbots, and software solutions for businesses.",
    images: ["/og-image.png"],
    creator: "@tysonstech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TysonsTechSolutions",
  url: "https://tysonstechsolutions.com",
  logo: "https://tysonstechsolutions.com/logo.png",
  description: "Custom web development, AI chatbots, and software solutions for businesses across 40+ industries.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: ["English"],
  },
  sameAs: [
    "https://twitter.com/tysonstech",
    "https://linkedin.com/company/tysonstechsolutions",
  ],
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "99",
    highPrice: "499",
    priceCurrency: "USD",
    offerCount: "3",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Technology Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Development",
          description: "Custom websites and web applications",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Chatbots",
          description: "Intelligent chatbots for customer engagement",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Software",
          description: "Tailored software solutions for business",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
