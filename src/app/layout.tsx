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
        alt: "TysonsTechSolutions - Web Development, AI Chatbots & Custom Software Solutions",
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://tysonstechsolutions.com/#organization",
  name: "TysonsTechSolutions",
  url: "https://tysonstechsolutions.com",
  logo: "https://tysonstechsolutions.com/favicon.ico",
  description: "Custom web development, AI chatbots, and software solutions for businesses across 40+ industries.",
  founder: {
    "@type": "Person",
    name: "Tyson",
    jobTitle: "Founder & Lead Developer",
    description: "Full-stack developer specializing in modern web applications, AI integrations, and business automation.",
  },
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
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "99-499",
      priceCurrency: "USD",
      unitText: "per month",
    },
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
          description: "Custom websites and web applications built with React, Next.js, and modern frameworks",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Chatbots",
          description: "Intelligent chatbots for customer engagement, lead qualification, and 24/7 support",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Software",
          description: "Tailored software solutions for business automation and growth",
        },
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TysonsTechSolutions",
  url: "https://tysonstechsolutions.com",
  publisher: {
    "@type": "Organization",
    "@id": "https://tysonstechsolutions.com/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://tysonstechsolutions.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a custom website cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our website packages start at $99/month for a professional business website. Custom web applications and AI chatbot integrations start at $199-499/month depending on features needed.",
      },
    },
    {
      "@type": "Question",
      name: "What industries do you work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We work with 40+ industries including contractors, law firms, healthcare, real estate, financial services, restaurants, and more. Our AI chatbots and websites are customized for each industry's specific needs.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most business websites are completed within 2-4 weeks. More complex web applications and custom software typically take 4-8 weeks depending on requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer ongoing support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! All our plans include ongoing support, maintenance, and updates. You work directly with us - no ticket systems or waiting days for responses.",
      },
    },
  ],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
