import Link from "next/link";
import { Metadata } from "next";
import { cities } from "@/data/cities";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tysonstechsolutions.com";

export const metadata: Metadata = {
  title: "Technology Solutions by City | Service Areas",
  description: "Web development, AI chatbots, and software solutions for businesses across the United States. Find your city and get a free consultation.",
  keywords: ["web development by city", "local tech company", "business technology USA", "software development near me"],
  alternates: {
    canonical: `${siteUrl}/locations`,
  },
};

// Group cities by state
const citiesByState = cities.reduce((acc, city) => {
  if (!acc[city.stateFullName]) {
    acc[city.stateFullName] = [];
  }
  acc[city.stateFullName].push(city);
  return acc;
}, {} as Record<string, typeof cities>);

const sortedStates = Object.keys(citiesByState).sort();

export default function LocationsPage() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Technology Solutions Across America
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We help businesses in {cities.length}+ cities with custom web development,
            AI chatbots, and software solutions. Find your city below.
          </p>
        </div>

        <div className="space-y-12">
          {sortedStates.map((state) => (
            <div key={state}>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">
                {state}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {citiesByState[state].map((city) => (
                  <Link
                    key={city.slug}
                    href={`/locations/${city.slug}`}
                    className="text-slate-600 hover:text-orange-500 hover:underline"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-6">
            Do not see your city? We serve businesses nationwide.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium text-lg"
          >
            Get Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
