import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import QuoteRequestForm from "@/components/forms/QuoteRequestForm";
import ServicePackages from "@/components/services/ServicePackages";

export async function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.name} Services | TysonsTechSolutions`,
    description: `${service.longDescription} Get a free consultation today.`,
    keywords: service.keywords,
    openGraph: {
      title: `${service.name} Services | TysonsTechSolutions`,
      description: service.longDescription,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="text-5xl mb-6">{service.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {service.name}
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              {service.longDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#quote"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium text-lg text-center"
              >
                Get Free Quote
              </a>
              <Link
                href="/contact"
                className="border-2 border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-lg font-medium text-lg text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            What is Included
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white p-6 rounded-xl border border-slate-200"
              >
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
                <span className="text-slate-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages (if available) */}
      <ServicePackages serviceSlug={service.slug} serviceName={service.name} />

      {/* Process */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Our Process
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Discovery", description: "We learn about your business, goals, and requirements" },
              { step: "2", title: "Strategy", description: "We create a detailed plan and timeline for your project" },
              { step: "3", title: "Development", description: "Our team builds your solution with regular updates" },
              { step: "4", title: "Launch & Support", description: "We deploy and provide ongoing maintenance" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Why Choose TysonsTechSolutions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Expert Team", description: "Experienced developers and designers", icon: "👨‍💻" },
              { title: "Fast Delivery", description: "On-time delivery, every time", icon: "⚡" },
              { title: "Transparent Pricing", description: "No hidden fees or surprises", icon: "💰" },
              { title: "Ongoing Support", description: "We are here when you need us", icon: "🤝" },
            ].map((item, i) => (
              <div key={i} className="text-center p-6">
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

      {/* Related Services */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Related Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedServices.map((related) => (
              <Link
                key={related.slug}
                href={`/services/${related.slug}`}
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

      {/* Quote Request Form */}
      <section id="quote" className="py-20 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Get a Free {service.name} Quote
            </h2>
            <p className="text-slate-300 text-lg">
              Tell us about your project and we&apos;ll get back to you within 24 hours with a detailed proposal.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 md:p-10">
            <QuoteRequestForm
              serviceSlug={service.slug}
              serviceName={service.name}
              sourcePage={`/services/${service.slug}`}
            />
          </div>
        </div>
      </section>

      {/* Schema.org Service JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.name,
            description: service.longDescription,
            provider: {
              "@type": "Organization",
              name: "TysonsTechSolutions",
              url: "https://tysonstechsolutions.com",
            },
            serviceType: service.name,
          }),
        }}
      />
    </div>
  );
}
