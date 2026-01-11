import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries } from "@/data/industries";
import { services } from "@/data/services";

export async function generateStaticParams() {
  return industries.map((industry) => ({ industry: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tysonstechsolutions.com";

  if (!industry) {
    return { title: "Industry Not Found" };
  }

  return {
    title: `${industry.name} Technology Solutions | TysonsTechSolutions`,
    description: `${industry.description}. Custom websites, AI chatbots, and software for ${industry.name.toLowerCase()}. Get a free consultation.`,
    keywords: industry.keywords,
    alternates: {
      canonical: `${siteUrl}/industries/${slug}`,
    },
    openGraph: {
      title: `${industry.name} Technology Solutions | TysonsTechSolutions`,
      description: `${industry.description}. Custom websites, AI chatbots, and software for ${industry.name.toLowerCase()}.`,
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: slug } = await params;
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    notFound();
  }

  const relatedIndustries = industries
    .filter((i) => i.category === industry.category && i.slug !== slug)
    .slice(0, 4);

  const topServices = services.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="text-5xl mb-6">{industry.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Technology Solutions for {industry.name}
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              {industry.description}. We build custom websites, AI chatbots, and
              software solutions that help {industry.name.toLowerCase()} grow and
              succeed.
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
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services for This Industry */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Solutions for {industry.name}
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
            We offer a full range of technology services tailored to the unique needs of {industry.name.toLowerCase()}.
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

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Why {industry.name} Choose TysonsTechSolutions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Industry Expertise",
                description: `We understand the unique challenges and opportunities in ${industry.name.toLowerCase()}`,
                icon: "🎯",
              },
              {
                title: "Custom Solutions",
                description: "Every solution is tailored to your specific business needs",
                icon: "⚙️",
              },
              {
                title: "Modern Technology",
                description: "Built with the latest frameworks and best practices",
                icon: "🚀",
              },
              {
                title: "Ongoing Support",
                description: "We are here to help long after your project launches",
                icon: "🤝",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Challenges */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Common Challenges We Solve
              </h2>
              <ul className="space-y-4">
                {[
                  "Outdated website that does not convert visitors",
                  "No online presence or poor search rankings",
                  "Manual processes that waste time and money",
                  "Difficulty capturing and managing leads",
                  "Lack of customer communication tools",
                  "Need for custom software but limited budget",
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
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-orange-100 mb-6">
                Schedule a free consultation to discuss your {industry.name.toLowerCase()} technology needs.
              </p>
              <Link
                href="/signup"
                className="inline-block bg-white text-orange-500 px-6 py-3 rounded-lg font-medium hover:bg-orange-50"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Industries */}
      {relatedIndustries.length > 0 && (
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Related Industries
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedIndustries.map((related) => (
                <Link
                  key={related.slug}
                  href={`/industries/${related.slug}`}
                  className="bg-white rounded-xl border border-slate-200 p-6 hover:border-orange-300 hover:shadow-lg transition-all"
                >
                  <div className="text-3xl mb-3">{related.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {related.name}
                  </h3>
                  <p className="text-slate-600 text-sm">{related.description}</p>
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
            Transform Your {industry.name} Business
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Join hundreds of {industry.name.toLowerCase()} that trust TysonsTechSolutions for their technology needs.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-orange-500 px-8 py-4 rounded-lg font-medium text-lg hover:bg-orange-50"
          >
            Get Started Today
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
            name: `Technology Solutions for ${industry.name}`,
            description: industry.description,
            provider: {
              "@type": "Organization",
              name: "TysonsTechSolutions",
              url: "https://tysonstechsolutions.com",
            },
            areaServed: "United States",
            serviceType: "Technology Consulting",
          }),
        }}
      />
    </div>
  );
}
