import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thumbtack Alternative for Contractors | TysonsTechSolutions",
  description: "Stop bidding against other pros for every job. Get exclusive leads from your own website with AI-powered instant quotes.",
};

const comparisons = [
  {
    feature: "Lead Ownership",
    us: "100% yours - from your website",
    them: "Shared marketplace leads",
  },
  {
    feature: "Pricing Model",
    us: "Fixed monthly subscription",
    them: "Pay to send quotes",
  },
  {
    feature: "Competition",
    us: "None - exclusive leads",
    them: "Multiple pros quote each job",
  },
  {
    feature: "Instant Quotes",
    us: "AI generates quotes automatically",
    them: "Manual quote required",
  },
  {
    feature: "24/7 Availability",
    us: "AI chatbot never sleeps",
    them: "You must respond manually",
  },
  {
    feature: "Platform Fees",
    us: "Zero transaction fees",
    them: "Fees on every lead",
  },
];

export default function ThumbtackAlternativePage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Stop Bidding Against Other Pros on Thumbtack
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Why pay to compete for leads when you can get exclusive leads 
            from your own website? Our AI responds instantly and generates quotes automatically.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium text-lg"
          >
            Start 14-Day Free Trial
          </Link>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            TysonsTechSolutions vs Thumbtack
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-4 px-4 text-left text-slate-600">Feature</th>
                  <th className="py-4 px-4 text-left text-orange-500">TysonsTechSolutions</th>
                  <th className="py-4 px-4 text-left text-slate-500">Thumbtack</th>
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
            The Problem with Thumbtack
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Pay to send quotes that customers may never read",
              "Compete against multiple pros for every single job",
              "Waste time writing custom quotes manually",
              "No guarantee of winning after paying for the lead",
              "Customers expect low prices in competitive marketplace",
              "Building Thumbtack's brand instead of your own",
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

      {/* How We Are Different */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            How We Are Different
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Your Website, Your Leads",
                description: "Leads come from YOUR website visitors who already found you. No competing bids.",
              },
              {
                title: "AI Does the Work",
                description: "Our chatbot qualifies leads, measures properties via satellite, and generates instant quotes.",
              },
              {
                title: "Predictable Costs",
                description: "One monthly fee. No per-lead charges. No surprises.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-orange-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Stop Competing for Leads?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Get exclusive leads from your own website. No more bidding wars.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-orange-500 px-8 py-4 rounded-lg font-medium text-lg hover:bg-orange-50"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}
