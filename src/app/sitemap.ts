import { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { blogPosts } from "@/data/blog-posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tysonstechsolutions.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Use current date for better crawl signals
  const currentDate = new Date().toISOString();

  // Static pages (excluding auth pages - they're blocked in robots.txt)
  const staticPages = [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/industries`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/features`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/locations`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/compare/angi-alternative`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/compare/thumbtack-alternative`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    // Note: /login and /signup removed - they are blocked in robots.txt
  ];

  // Service pages (12 services) - high priority
  const servicePages = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Industry pages (40 industries) - high priority
  const industryPages = industries.map((industry) => ({
    url: `${siteUrl}/industries/${industry.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Blog posts - use the post's date if available
  const blogPostPages = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date).toISOString() : currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Location pages - prioritize top 50 cities with higher priority
  const locationPages = cities.map((city, index) => ({
    url: `${siteUrl}/locations/${city.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    // Top 50 cities get higher priority
    priority: index < 50 ? 0.7 : 0.5,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...industryPages,
    ...blogPostPages,
    ...locationPages,
  ];
}
