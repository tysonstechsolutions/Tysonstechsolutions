import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sealcoating & Asphalt Contractor Leads - AI Quote Generator",
  description: "Get 3x more sealcoating leads with AI chatbot. Instant driveway quotes, satellite measurement, 24/7 lead capture. Used by 500+ asphalt contractors.",
  keywords: ["sealcoating leads", "asphalt contractor leads", "paving leads", "driveway quote software", "asphalt CRM"],
};

const services = [
  { name: "Sealcoating", icon: "🛡️" },
  { name: "Crack Filling", icon: "🔧" },
  { name: "Pothole Repair", icon: "🕳️" },
  { name: "Line Striping", icon: "📏" },
  { name: "Paving", icon: "🚧" },
];

const benefits = [
  {
    title: "Instant Quote Generation",
    description: "AI automatically measures driveways and parking lots using satellite imagery and generates accurate quotes based on your pricing.",
  },
  {
    title: "24/7 Lead Capture",
    description: "Never miss a lead again. Our chatbot responds instantly to website visitors, even at 2 AM.",
  },
  {
    title: "SMS Lead Alerts",
    description: "Get notified immediately when you receive a new lead. Reply directly via text.",
  },
  {
    title: "Your Exclusive Leads",
    description: "Unlike Angi or Thumbtack, these are YOUR leads from YOUR website. No sharing, no competing bids.",
  },
];

export default function AsphaltContractorsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium mb-6">
              For Asphalt & Paving Contractors
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Stop Losing Leads to Slow Response Times
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Our AI chatbot responds instantly, measures driveways via satellite,
              and generates sealcoating quotes automatically. Get more jobs, less hassle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium text-lg text-center"
              >
                Get Started
              </Link>
              <Link
                href="#demo"
                className="border-2 border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-lg font-medium text-lg text-center"
              >
                See Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Works for All Asphalt Services
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {services.map((service) => (
              <div
                key={service.name}
                className="bg-white px-6 py-3 rounded-full border border-slate-200 flex items-center gap-2"
              >
                <span>{service.icon}</span>
                <span className="font-medium text-slate-700">{service.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Why Asphalt Contractors Love Our Platform
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-xl border border-slate-200 p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to 3x Your Lead Response Rate?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Join hundreds of asphalt contractors using AI to capture more leads.
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
