import { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { blogPosts } from "@/data/blog-posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tysonstechsolutions.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Use a fixed date for static content to avoid unnecessary recrawling
  // Update these dates when content actually changes
  const staticContentDate = "2025-01-05T00:00:00.000Z";
  const dynamicContentDate = "2025-01-05T00:00:00.000Z";

  // Static pages
  const staticPages = [
    {
      url: siteUrl,
      lastModified: staticContentDate,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: staticContentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/industries`,
      lastModified: staticContentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: staticContentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/features`,
      lastModified: staticContentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: staticContentDate,
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/locations`,
      lastModified: staticContentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/compare/angi-alternative`,
      lastModified: staticContentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/compare/thumbtack-alternative`,
      lastModified: staticContentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/signup`,
      lastModified: staticContentDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/login`,
      lastModified: staticContentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  // Service pages (12 services)
  const servicePages = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: dynamicContentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Industry pages (40 industries)
  const industryPages = industries.map((industry) => ({
    url: `${siteUrl}/industries/${industry.slug}`,
    lastModified: dynamicContentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Blog posts - use the post's date if available
  const blogPostPages = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date).toISOString() : dynamicContentDate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Location pages (200 cities)
  const locationPages = cities.map((city) => ({
    url: `${siteUrl}/locations/${city.slug}`,
    lastModified: dynamicContentDate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...industryPages,
    ...blogPostPages,
    ...locationPages,
  ];
}
