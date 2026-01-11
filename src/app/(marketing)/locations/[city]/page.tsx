import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities } from "@/data/cities";
import { services } from "@/data/services";

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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tysonstechsolutions.com";

  if (!city) {
    return { title: "Location Not Found" };
  }

  return {
    title: `Web Development & Tech Solutions in ${city.name}, ${city.state}`,
    description: `Custom web development, AI chatbots, and software solutions for businesses in ${city.name}, ${city.stateFullName}. Get a free consultation with TysonsTechSolutions.`,
    keywords: [
      `web development ${city.name}`,
      `software development ${city.name}`,
      `AI chatbot ${city.name}`,
      `website design ${city.state}`,
      `tech company ${city.name}`,
    ],
    alternates: {
      canonical: `${siteUrl}/locations/${slug}`,
    },
    openGraph: {
      title: `Web Development & Tech Solutions in ${city.name}, ${city.state}`,
      description: `Custom web development, AI chatbots, and software solutions for businesses in ${city.name}.`,
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

  const topServices = services.slice(0, 6);

  // Get nearby cities in the same state
  const nearbyCities = cities
    .filter((c) => c.state === city.state && c.slug !== city.slug)
    .slice(0, 5);

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
              Technology Solutions for {city.name} Businesses
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Custom web development, AI chatbots, and software solutions for businesses
              in {city.name}, {city.stateFullName}. We help local businesses grow with
              modern technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium text-lg text-center"
              >
                Get Free Consultation
              </Link>
              <Link
                href="/services"
                className="border-2 border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-lg font-medium text-lg text-center"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Services in {city.name}
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
            Comprehensive technology solutions for {city.name} businesses
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-xl border border-slate-200 p-6 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-orange-500 mb-2">
                  {service.name}
                </h3>
                <p className="text-slate-600 text-sm">{service.description}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/services"
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Local */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Why {city.name} Businesses Choose Us
              </h2>
              <p className="text-slate-600 mb-6">
                We understand the unique needs of businesses in {city.stateFullName}.
                Our team delivers technology solutions that help you compete and grow
                in your local market.
              </p>
              <ul className="space-y-4">
                {[
                  `Custom solutions for ${city.name} businesses`,
                  "Competitive pricing for local companies",
                  "Ongoing support and maintenance",
                  "Modern technology and best practices",
                  "Fast turnaround times",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Get Started Today
              </h3>
              <p className="text-slate-600 mb-6">
                Schedule a free consultation to discuss your {city.name} business
                technology needs.
              </p>
              <Link
                href="/signup"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-medium text-center"
              >
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-400">$4,200+</div>
              <div className="text-slate-400">Avg. Yearly Savings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">16+</div>
              <div className="text-slate-400">Industries Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">24/7</div>
              <div className="text-slate-400">Lead Capture</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">3 min</div>
              <div className="text-slate-400">Avg. Quote Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      {nearbyCities.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Also Serving Businesses Near {city.name}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {nearbyCities.map((nearbyCity) => (
                <Link
                  key={nearbyCity.slug}
                  href={`/locations/${nearbyCity.slug}`}
                  className="bg-slate-100 hover:bg-orange-100 text-slate-700 hover:text-orange-600 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  {nearbyCity.name}, {nearbyCity.state}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Grow Your {city.name} Business?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Get a free consultation and discover how technology can help your business thrive.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-orange-500 px-8 py-4 rounded-lg font-medium text-lg hover:bg-orange-50"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Technology Solutions - ${city.name}, ${city.state}`,
            description: `Web development, AI chatbots, and software solutions for businesses in ${city.name}, ${city.stateFullName}`,
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
