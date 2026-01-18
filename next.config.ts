import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure consistent URL structure for SEO
  trailingSlash: false,

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com https://js.stripe.com https://maps.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://assets.calendly.com https://fonts.googleapis.com",
              "img-src 'self' data: blob: https: http:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.anthropic.com https://api.stripe.com https://maps.googleapis.com https://calendly.com",
              "frame-src 'self' https://calendly.com https://js.stripe.com",
              "frame-ancestors 'self'",
              "form-action 'self'",
              "base-uri 'self'",
              "object-src 'self'",
            ].join("; "),
          },
        ],
      },
      // Allow widget to be embedded in iframes on other sites
      {
        source: "/widget/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
