import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Angi Alternative 2024 - Exclusive Leads for Contractors",
  description: "Stop paying for shared Angi leads. Get exclusive leads from your website with AI chatbot. No bidding, no competition. 50%+ cheaper than Angi.",
  keywords: ["Angi alternative", "Angies List alternative", "exclusive contractor leads", "no shared leads"],
};

const comparisons = [
  {
    feature: "Lead Ownership",
    us: "100% yours - from your website",
    them: "Shared with competitors",
  },
  {
    feature: "Cost Per Lead",
    us: "Fixed monthly fee",
    them: "$15-$100+ per lead",
  },
  {
    feature: "Competition",
    us: "None - exclusive leads",
    them: "Up to 4 contractors per lead",
  },
  {
    feature: "Response Time",
    us: "Instant AI response 24/7",
    them: "Manual response required",
  },
  {
    feature: "Brand Building",
    us: "Builds your brand",
    them: "Builds Angi's brand",
  },
  {
    feature: "Customer Relationship",
    us: "Direct from day one",
    them: "Through Angi platform",
  },
];

export default function AngiAlternativePage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Tired of Paying for Shared Leads on Angi?
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Stop competing with 3 other contractors for every lead. 
            Get exclusive leads from your own website with AI-powered chat.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium text-lg"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            TysonsTechSolutions vs Angi
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-4 px-4 text-left text-slate-600">Feature</th>
                  <th className="py-4 px-4 text-left text-orange-500">TysonsTechSolutions</th>
                  <th className="py-4 px-4 text-left text-slate-500">Angi</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row) => (
                  <tr key={row.feature} className="border-b border-slate-100">
                    <td className="py-4 px-4 font-medium text-slate-900">{row.feature}</td>
                    <td className="py-4 px-4 text-green-600">{row.us}</td>
                    <td className="py-4 px-4 text-slate-500">{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            The Problem with Angi Leads
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Pay for leads that 3 other contractors also received",
              "Race to respond or lose the job to faster competitors",
              "No control over lead quality or timing",
              "Building Angi's brand instead of your own",
              "Customers compare you to competitors before you even call",
              "Monthly fees plus per-lead fees add up fast",
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg">
                <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-slate-700">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready for Exclusive Leads?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Start capturing leads from your own website today. No shared leads, ever.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-orange-500 px-8 py-4 rounded-lg font-medium text-lg hover:bg-orange-50"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
