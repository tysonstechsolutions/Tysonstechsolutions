import Link from "next/link";
import { Metadata } from "next";
import { cities } from "@/data/cities";

export const metadata: Metadata = {
  title: "Contractor Lead Generation by City | Service Areas",
  description: "AI-powered lead generation for contractors across the United States. Find your city and start capturing more leads with our AI chatbot.",
  keywords: ["contractor leads by city", "local contractor marketing", "contractor lead generation USA"],
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
            Contractor Lead Generation Across America
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We help contractors in {cities.length}+ cities capture more leads with AI-powered chatbots.
            Find your city below.
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
            Do not see your city? We serve contractors nationwide.
          </p>
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
