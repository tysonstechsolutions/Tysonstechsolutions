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
    default: "AI Lead Generation for Contractors | TysonsTechSolutions",
    template: "%s | TysonsTechSolutions",
  },
  description: "Get more leads with AI-powered chatbots for contractors. Instant quotes, satellite measurement, 24/7 response. Start your free trial today.",
  keywords: [
    "contractor lead generation",
    "AI chatbot for contractors",
    "sealcoating leads",
    "asphalt contractor software",
    "instant quote software",
    "contractor CRM",
    "lead capture chatbot",
    "home service leads",
    "paving contractor leads",
    "contractor marketing",
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
    title: "AI Lead Generation for Contractors | TysonsTechSolutions",
    description: "Get more leads with AI-powered chatbots. Instant quotes, satellite measurement, 24/7 response. The #1 lead generation tool for service contractors.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TysonsTechSolutions - AI Lead Generation for Contractors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Lead Generation for Contractors | TysonsTechSolutions",
    description: "Get more leads with AI-powered chatbots. Instant quotes, satellite measurement, 24/7 response.",
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "TysonsTechSolutions",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "AI-powered lead generation chatbot for service contractors.",
  offers: {
    "@type": "Offer",
    price: "99",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "127",
  },
  provider: {
    "@type": "Organization",
    name: "TysonsTechSolutions",
    url: "https://tysonstechsolutions.com",
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
        className={`$\{geistSans.variable\} $\{geistMono.variable\} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
