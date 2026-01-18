import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Portfolio - Websites & Apps We've Built",
  description: "See real websites and applications built by TysonsTechSolutions. From local service businesses to custom software solutions - view our work.",
  keywords: [
    "web development portfolio",
    "website examples",
    "custom software portfolio",
    "business website examples",
    "AI chatbot examples",
  ],
};

const portfolioProjects = [
  {
    id: "pinpoint-parking",
    name: "Pinpoint Parking",
    url: "https://pinpointparking.net",
    industry: "Asphalt & Paving",
    location: "Mount Vernon, IL",
    description: "Full-service website for a Southern Illinois asphalt paving company. Features service pages, location-based SEO, project gallery, and blog.",
    services: ["Custom Website", "SEO Optimization", "Content Strategy", "Mobile Optimization"],
    features: [
      "5 service pages with detailed pricing",
      "15+ location landing pages",
      "Before/after project gallery",
      "Mobile-first responsive design",
      "Schema markup for local SEO",
      "Blog with 10+ industry articles",
    ],
    results: [
      "First page Google rankings for local keywords",
      "45-mile service area coverage",
      "Professional online presence",
    ],
    screenshot: "/images/portfolio/pinpoint-parking.jpg",
    color: "from-yellow-500 to-amber-600",
  },
  {
    id: "king-city-disposal",
    name: "King City Disposal",
    url: "https://kingcitydisposal.com",
    industry: "Waste Management",
    location: "Mount Vernon, IL",
    description: "Conversion-focused website for a dumpster rental company. Includes instant quoting, service area maps, transparent pricing, and customer reviews.",
    services: ["Custom Website", "AI Chatbot", "Lead Generation", "Local SEO"],
    features: [
      "Instant quote request system",
      "Interactive service area map",
      "Transparent pricing display",
      "Google Reviews integration",
      "Mobile-optimized booking flow",
      "Blog with local guides",
    ],
    results: [
      "Streamlined customer inquiries",
      "Clear pricing builds trust",
      "Professional brand presence",
    ],
    screenshot: "/images/portfolio/king-city-disposal.jpg",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: "milio",
    name: "Milio",
    url: "https://github.com/tysonstechsolutions/Milio",
    industry: "AI & Mobile",
    location: "Personal Project",
    description: "AI-powered Android voice assistant built with Claude API. Features wake word detection, hands-free device control, and personalized life management for users with ADHD.",
    services: ["Android Development", "AI Integration", "Voice Recognition", "Accessibility"],
    features: [
      "Wake word activation ('Hey Milio')",
      "Claude AI integration for natural conversation",
      "ElevenLabs text-to-speech",
      "50+ local voice commands",
      "Accessibility service for device automation",
      "ADHD-focused task management",
    ],
    results: [
      "Hands-free Android control",
      "Personalized AI assistant",
      "Production-ready v0.8.2",
    ],
    screenshot: "/images/portfolio/milio.jpg",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "swing-solutions",
    name: "Swing Solutions",
    url: "https://github.com/tysonstechsolutions/swing-solutions",
    industry: "AI & Sports Tech",
    location: "Personal Project",
    description: "AI-powered golf swing analysis toolkit for Twitch streamers. Features 'Chad' - an AI co-host that analyzes swings with witty commentary, video markup, and OBS integration.",
    services: ["Python Development", "Computer Vision", "AI Integration", "Streaming Tools"],
    features: [
      "Claude Vision API for swing analysis",
      "MediaPipe pose estimation overlays",
      "Real-time OBS integration",
      "Voice-activated AI co-host",
      "Automatic swing detection from video",
      "Professional streaming overlays",
    ],
    results: [
      "Full streaming toolkit",
      "AI-powered analysis",
      "Cross-platform desktop app",
    ],
    screenshot: "/images/portfolio/swing-solutions.jpg",
    color: "from-green-500 to-teal-600",
  },
  {
    id: "ai-tweet-generator",
    name: "AI Tweet Generator",
    url: "https://github.com/tysonstechsolutions/ai-tweet-generator",
    industry: "AI & SaaS",
    location: "Personal Project",
    description: "Chrome extension and SaaS platform that uses Claude AI to help Twitter/X creators write engaging tweets. Features voice training to match your writing style.",
    services: ["Chrome Extension", "React", "AI Integration", "SaaS Development"],
    features: [
      "Injects directly into Twitter compose box",
      "Voice profile training from past tweets",
      "150+ viral hook templates",
      "Thread generation (5-10 tweets)",
      "Stripe subscription integration",
      "Freemium model (10 free/month)",
    ],
    results: [
      "Production-ready SaaS",
      "Chrome extension + API",
      "Full payment integration",
    ],
    screenshot: "/images/portfolio/ai-tweet-generator.jpg",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "viral-clip-generator",
    name: "Viral Clip Generator",
    url: "https://github.com/tysonstechsolutions/viral-clip-generator",
    industry: "AI & Video",
    location: "Personal Project",
    description: "Full-stack app that automatically extracts viral-worthy short clips from longer videos using AI. Transforms videos into TikTok/Reels/Shorts format.",
    services: ["Python/Flask", "React", "AI Integration", "Video Processing"],
    features: [
      "OpenAI Whisper transcription",
      "Claude AI viral moment detection",
      "Automatic vertical reframing (9:16)",
      "Viral scoring system (1-100)",
      "YouTube URL or file upload",
      "Real-time progress via WebSocket",
    ],
    results: [
      "End-to-end video pipeline",
      "AI-powered clip selection",
      "Multiple export formats",
    ],
    screenshot: "/images/portfolio/viral-clip-generator.jpg",
    color: "from-pink-500 to-rose-600",
  },
];

const stats = [
  { number: "2", label: "Live Client Websites" },
  { number: "4", label: "AI-Powered Apps" },
  { number: "7", label: "Total Projects" },
  { number: "10+", label: "Technologies" },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Work Speaks for Itself
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Real websites. Real results. See the quality and attention to detail we bring to every project.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-orange-400">{stat.number}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why View Our Portfolio */}
      <section className="py-12 px-6 bg-orange-50 border-b border-orange-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-slate-700">
            <strong className="text-slate-900">Transparency matters.</strong> Unlike agencies that show mockups or hide their work,
            we proudly display live websites you can visit right now. Click any project to see exactly what you'd get.
          </p>
        </div>
      </section>

      {/* Portfolio Projects */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-24">
            {portfolioProjects.map((project, index) => (
              <div
                key={project.id}
                className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Project Screenshot/Preview */}
                <div className={`order-1 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className={`bg-gradient-to-br ${project.color} rounded-2xl p-4 shadow-2xl transform group-hover:scale-[1.02] transition-transform`}>
                      <div className="bg-slate-900 rounded-xl overflow-hidden">
                        {/* Browser Chrome */}
                        <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="flex-1 bg-slate-700 rounded px-3 py-1 text-xs text-slate-400 truncate">
                            {project.url}
                          </div>
                        </div>
                        {/* Screenshot Placeholder */}
                        <div className="aspect-[16/10] bg-slate-700 flex items-center justify-center">
                          <div className="text-center p-8">
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                              <span className="text-3xl text-white font-bold">{project.name.charAt(0)}</span>
                            </div>
                            <div className="text-white font-bold text-xl mb-2">{project.name}</div>
                            <div className="text-slate-400 text-sm">Click to view project →</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Project Details */}
                <div className={`order-2 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-orange-100 text-orange-600 text-sm font-medium px-3 py-1 rounded-full">
                      {project.industry}
                    </span>
                    <span className="text-slate-500 text-sm">{project.location}</span>
                  </div>

                  <h2 className="text-3xl font-bold text-slate-900 mb-4">{project.name}</h2>
                  <p className="text-slate-600 text-lg mb-6">{project.description}</p>

                  {/* Services Provided */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Services Provided</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service) => (
                        <span
                          key={service}
                          className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Key Features</h3>
                    <ul className="grid grid-cols-1 gap-2">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-slate-600">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Visit Live Site →
                    </a>
                    <Link
                      href="/contact"
                      className="border-2 border-slate-300 text-slate-700 hover:border-orange-500 hover:text-orange-500 px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Get Something Similar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Clients Get */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What Every Project Includes</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Whether you're a local service business or growing company, here's what you get with every TysonsTechSolutions project.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Mobile-First Design</h3>
              <p className="text-slate-600">
                Every website looks and works perfectly on phones, tablets, and desktops. Because most of your customers find you on mobile.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">SEO Built-In</h3>
              <p className="text-slate-600">
                Schema markup, meta tags, sitemap, and technical SEO included. Your site is built to rank from day one.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Fast Loading</h3>
              <p className="text-slate-600">
                Optimized images, clean code, and modern hosting. Your site loads fast so customers don't leave.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Lead Generation</h3>
              <p className="text-slate-600">
                Contact forms, call buttons, and optional AI chatbot. Multiple ways for customers to reach you.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Easy Updates</h3>
              <p className="text-slate-600">
                Need changes? We handle updates for you. No learning complex systems or hiring someone else.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Ongoing Support</h3>
              <p className="text-slate-600">
                Questions? Issues? We're here to help. Real support from real people who built your site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Let's build something that makes your business look as good as it is.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-orange-500 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 shadow-lg"
            >
              Start Your Project
            </Link>
            <Link
              href="/pricing"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white/10"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
