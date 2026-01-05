import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve | TysonsTechSolutions",
  description: "AI-powered lead generation for service contractors. Get instant quotes and capture more leads from your website.",
};

const industries = [
  {
    name: "Asphalt & Paving",
    slug: "asphalt-contractors",
    description: "Sealcoating, crack filling, paving, and line striping contractors",
    status: "live",
    icon: "🛣️",
  },
  {
    name: "Lawn Care",
    slug: "lawn-care",
    description: "Lawn mowing, fertilizing, and landscaping services",
    status: "coming",
    icon: "🌿",
  },
  {
    name: "Painting",
    slug: "painting-contractors",
    description: "Interior and exterior painting contractors",
    status: "coming",
    icon: "🎨",
  },
  {
    name: "Dumpster Rental",
    slug: "dumpster-rental",
    description: "Roll-off dumpster and waste management services",
    status: "coming",
    icon: "🗑️",
  },
  {
    name: "Roofing",
    slug: "roofing-contractors",
    description: "Roof repair, replacement, and installation",
    status: "coming",
    icon: "🏠",
  },
  {
    name: "Fencing",
    slug: "fencing-contractors",
    description: "Fence installation and repair services",
    status: "coming",
    icon: "🏗️",
  },
];

export default function IndustriesPage() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Industries We Serve
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our AI-powered chat widget helps service contractors capture more leads
            and provide instant quotes to their customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group bg-white rounded-xl border border-slate-200 p-8 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-4">{industry.icon}</div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600">
                  {industry.name}
                </h2>
                {industry.status === "coming" && (
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>
              <p className="text-slate-600">{industry.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
