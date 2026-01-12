import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, getCityContent, stateData, stateIndustries } from "@/data/cities";
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

  const industries = city.topIndustries || stateIndustries[city.state] || ["businesses"];

  return {
    title: `Web Development & Tech Solutions in ${city.name}, ${city.state}`,
    description: `Custom web development, AI chatbots, and software solutions for ${industries.slice(0, 2).join(" and ")} businesses in ${city.name}, ${city.stateFullName}. ${city.population ? `Serving ${city.population} residents and ${city.businessCount} local businesses.` : ""} Get a free consultation with TysonsTechSolutions.`,
    keywords: [
      `web development ${city.name}`,
      `software development ${city.name}`,
      `AI chatbot ${city.name}`,
      `website design ${city.state}`,
      `tech company ${city.name}`,
      `${city.name} web developer`,
      `${city.stateFullName} software company`,
      ...industries.map(ind => `${ind.toLowerCase()} website ${city.name}`),
    ],
    alternates: {
      canonical: `${siteUrl}/locations/${slug}`,
    },
    openGraph: {
      title: `Web Development & Tech Solutions in ${city.name}, ${city.state}`,
      description: `Custom web development, AI chatbots, and software solutions for businesses in ${city.name}. ${city.economicHighlight || ""}`,
      url: `${siteUrl}/locations/${slug}`,
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

  const cityContent = getCityContent(city);
  const topServices = services.slice(0, 6);

  // Get nearby cities in the same state
  const nearbyCities = cities
    .filter((c) => c.state === city.state && c.slug !== city.slug)
    .slice(0, 5);

  // Get cities in different states for cross-linking
  const otherStateCities = cities
    .filter((c) => c.state !== city.state)
    .slice(0, 3);

  const stateInfo = stateData[city.state];

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
            <p className="text-xl text-slate-300 mb-4">
              Custom web development, AI chatbots, and software solutions for businesses
              in {city.name}, {city.stateFullName}. We help local businesses grow with
              modern technology.
            </p>
            {city.economicHighlight && (
              <p className="text-lg text-slate-400 mb-8">
                {city.economicHighlight}
              </p>
            )}
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

      {/* City Stats - Unique content */}
      {(city.population || city.businessCount || city.topIndustries) && (
        <section className="py-12 px-6 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {city.population && (
                <div>
                  <div className="text-2xl font-bold text-slate-900">{city.population}</div>
                  <div className="text-slate-600 text-sm">Population</div>
                </div>
              )}
              {city.businessCount && (
                <div>
                  <div className="text-2xl font-bold text-slate-900">{city.businessCount}</div>
                  <div className="text-slate-600 text-sm">Local Businesses</div>
                </div>
              )}
              {stateInfo && (
                <div>
                  <div className="text-2xl font-bold text-slate-900">{stateInfo.timezone}</div>
                  <div className="text-slate-600 text-sm">Time Zone</div>
                </div>
              )}
              {stateInfo && (
                <div>
                  <div className="text-2xl font-bold text-slate-900">{stateInfo.region}</div>
                  <div className="text-slate-600 text-sm">Region</div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Top Industries - Unique per city */}
      {city.topIndustries && city.topIndustries.length > 0 && (
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
              Key Industries in {city.name}
            </h2>
            <p className="text-slate-600 text-center max-w-2xl mx-auto mb-8">
              We specialize in building technology solutions for {city.name}&apos;s leading industries
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {city.topIndustries.map((industry) => (
                <span
                  key={industry}
                  className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {industry}
                </span>
              ))}
            </div>
            {city.techScene && (
              <p className="text-slate-600 text-center max-w-2xl mx-auto mt-6 italic">
                {city.techScene}
              </p>
            )}
          </div>
        </section>
      )}

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

      {/* FAQ Section - Unique per city */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-center mb-12">
            Common questions about our services in {city.name}
          </p>
          <div className="space-y-6">
            {cityContent.faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Unique per city */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            What {city.name} Businesses Say
          </h2>
          <p className="text-slate-600 text-center mb-12">
            Trusted by businesses across {city.stateFullName}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {cityContent.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 mb-4">&quot;{testimonial.text}&quot;</p>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
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
              <p className="text-slate-600 mb-4">
                We understand the unique needs of businesses in {city.stateFullName}.
                Our team delivers technology solutions that help you compete and grow
                in your local market.
              </p>
              {stateInfo && (
                <p className="text-slate-600 mb-6">
                  {stateInfo.businessClimate}
                </p>
              )}
              <ul className="space-y-4">
                {[
                  `Custom solutions for ${city.name} businesses`,
                  `Experience with ${city.topIndustries?.[0] || "local"} industry`,
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
              <div className="text-3xl font-bold text-orange-400">40+</div>
              <div className="text-slate-400">Industries Served</div>
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

      {/* Other Major Cities */}
      <section className="py-12 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center">
            Serving Businesses Nationwide
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {otherStateCities.map((otherCity) => (
              <Link
                key={otherCity.slug}
                href={`/locations/${otherCity.slug}`}
                className="text-slate-600 hover:text-orange-500 text-sm transition-colors"
              >
                {otherCity.name}, {otherCity.state}
              </Link>
            ))}
            <Link
              href="/locations"
              className="text-orange-500 hover:text-orange-600 text-sm font-medium"
            >
              View All Locations →
            </Link>
          </div>
        </div>
      </section>

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

      {/* Schema.org JSON-LD - Enhanced */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `https://tysonstechsolutions.com/locations/${slug}`,
            name: `TysonsTechSolutions - ${city.name}, ${city.state}`,
            description: `Web development, AI chatbots, and software solutions for businesses in ${city.name}, ${city.stateFullName}`,
            url: `https://tysonstechsolutions.com/locations/${slug}`,
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
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Technology Services",
              itemListElement: services.slice(0, 3).map(service => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: service.name,
                  description: service.description,
                },
              })),
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "127",
              bestRating: "5",
              worstRating: "1",
            },
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: cityContent.faqs.map(faq => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
