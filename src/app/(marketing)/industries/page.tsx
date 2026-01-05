import Link from "next/link";
import { Metadata } from "next";
import { industries, industriesByCategory } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries We Serve - Tech Solutions for Every Business",
  description: "Custom web development, AI chatbots, and software solutions for law firms, healthcare, restaurants, contractors, and 40+ industries. Get a free consultation.",
  keywords: ["business technology solutions", "industry software", "custom web development", "AI chatbots for business"],
};

export default function IndustriesPage() {
  const categories = Object.keys(industriesByCategory);

  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Industries We Serve
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We build custom technology solutions for businesses across 40+ industries.
            From websites to AI chatbots to custom software, we help businesses grow.
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
              {category}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {industriesByCategory[category].map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="group bg-white rounded-xl border border-slate-200 p-6 hover:border-orange-300 hover:shadow-lg transition-all"
                >
                  <div className="text-3xl mb-3">{industry.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-orange-500 mb-2">
                    {industry.name}
                  </h3>
                  <p className="text-slate-600 text-sm">{industry.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-16 text-center bg-slate-50 rounded-2xl p-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Do Not See Your Industry?
          </h2>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            We work with businesses of all types. Contact us and we will create a custom solution tailored to your specific needs.
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
