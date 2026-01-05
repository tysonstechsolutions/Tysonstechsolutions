import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities } from "@/data/cities";

export async function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = cities.find((c) => c.slug === slug);

  if (!city) {
    return { title: "Location Not Found" };
  }

  return {
    title: `Contractor Lead Generation in ${city.name}, ${city.state} | AI Chatbot`,
    description: `Get more contractor leads in ${city.name}, ${city.stateFullName}. AI chatbot captures leads 24/7, instant quotes, satellite measurement. Join ${city.name} contractors using TysonsTechSolutions.`,
    keywords: [
      `${city.name} contractor leads`,
      `${city.name} sealcoating`,
      `${city.name} asphalt contractor`,
      `contractor marketing ${city.name}`,
      `lead generation ${city.state}`,
    ],
    openGraph: {
      title: `Contractor Lead Generation in ${city.name}, ${city.state}`,
      description: `AI-powered lead capture for contractors in ${city.name}. Instant quotes, 24/7 chatbot, satellite measurements.`,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = cities.find((c) => c.slug === slug);

  if (!city) {
    notFound();
  }

  // Generate some dynamic content based on city
  const nearbyText = cities
    .filter((c) => c.state === city.state && c.slug !== city.slug)
    .slice(0, 5)
    .map((c) => c.name)
    .join(", ");

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium mb-6">
              Serving {city.name}, {city.state}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Lead Generation for {city.name} Contractors
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Capture more leads from your {city.name} website with our AI chatbot.
              Instant quotes, satellite property measurement, and 24/7 lead response.
              Join contractors across {city.stateFullName} growing their business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium text-lg text-center"
              >
                Start 14-Day Free Trial
              </Link>
              <Link
                href="/pricing"
                className="border-2 border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-lg font-medium text-lg text-center"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Local Stats */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Why {city.name} Contractors Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">78%</div>
              <div className="text-slate-600">of customers choose the first contractor to respond</div>
            </div>
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">2 sec</div>
              <div className="text-slate-600">average response time with our AI chatbot</div>
            </div>
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">3x</div>
              <div className="text-slate-600">more leads than traditional contact forms</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Perfect for {city.name} Service Contractors
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
            Our AI chatbot works for all types of service contractors in {city.stateFullName}
          </p>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Sealcoating", icon: "🛡️" },
              { name: "Asphalt Paving", icon: "🛣️" },
              { name: "Lawn Care", icon: "🌿" },
              { name: "Landscaping", icon: "🌳" },
              { name: "Roofing", icon: "🏠" },
              { name: "Painting", icon: "🎨" },
              { name: "Fencing", icon: "🏗️" },
              { name: "Concrete", icon: "🧱" },
            ].map((service) => (
              <div
                key={service.name}
                className="bg-white px-6 py-4 rounded-xl border border-slate-200 flex items-center gap-3"
              >
                <span className="text-2xl">{service.icon}</span>
                <span className="font-medium text-slate-700">{service.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            How It Works for {city.name} Contractors
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Install Widget",
                description: `Add our chat widget to your ${city.name} contractor website in minutes`,
              },
              {
                step: "2",
                title: "AI Engages Visitors",
                description: "Our AI chatbot greets visitors and qualifies leads 24/7",
              },
              {
                step: "3",
                title: "Instant Quotes",
                description: "AI measures properties via satellite and generates quotes automatically",
              },
              {
                step: "4",
                title: "Get Notified",
                description: `Receive SMS alerts for new ${city.name} leads instantly`,
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      {nearbyText && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Also Serving Contractors Near {city.name}
            </h2>
            <p className="text-slate-600 text-center">
              We help contractors throughout {city.stateFullName} including {nearbyText}, and more.
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Grow Your {city.name} Contracting Business?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Join contractors in {city.stateFullName} using AI to capture more leads.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-orange-500 px-8 py-4 rounded-lg font-medium text-lg hover:bg-orange-50"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Schema.org LocalBusiness JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Contractor Lead Generation - ${city.name}, ${city.state}`,
            description: `AI-powered lead generation for contractors in ${city.name}, ${city.stateFullName}`,
            areaServed: {
              "@type": "City",
              name: city.name,
              containedInPlace: {
                "@type": "State",
                name: city.stateFullName,
              },
            },
            provider: {
              "@type": "Organization",
              name: "TysonsTechSolutions",
              url: "https://tysonstechsolutions.com",
            },
          }),
        }}
      />
    </div>
  );
}
