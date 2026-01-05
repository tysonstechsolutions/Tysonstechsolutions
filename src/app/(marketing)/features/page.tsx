import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chatbot Features for Contractors - Instant Quotes & Lead Capture",
  description: "24/7 AI chatbot captures leads, measures properties via satellite, and sends instant quotes. SMS alerts, CRM integration. Free 14-day trial.",
  keywords: ["contractor chatbot", "AI lead generation", "instant quote software", "satellite measurement"],
};

const features = [
  {
    title: "AI Chatbot",
    description: "24/7 automated conversations that qualify leads and collect contact info",
    icon: "💬",
    href: "/features/ai-chatbot",
  },
  {
    title: "Instant Quotes",
    description: "Automatically generate accurate estimates based on your pricing",
    icon: "💰",
    href: "/features/instant-quotes",
  },
  {
    title: "Satellite Measurement",
    description: "AI measures driveways and parking lots using Google satellite imagery",
    icon: "🛰️",
    href: "/features/satellite-measurement",
  },
  {
    title: "SMS Alerts",
    description: "Get instant text notifications when new leads come in",
    icon: "📱",
    href: "/features/sms-alerts",
  },
];

export default function FeaturesPage() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Powerful Features for Contractors
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Everything you need to capture more leads from your website and respond faster than your competition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group bg-white rounded-xl border border-slate-200 p-8 hover:border-orange-300 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h2 className="text-2xl font-semibold text-slate-900 group-hover:text-orange-500 mb-3">
                {feature.title}
              </h2>
              <p className="text-slate-600 text-lg">{feature.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/signup"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium text-lg"
          >
            Start Your Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}
