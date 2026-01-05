import Link from "next/link";
import { Metadata } from "next";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Our Services - Web Development, AI Chatbots, Software & More",
  description: "Full-service technology solutions: web development, AI chatbots, custom software, mobile apps, SEO, and digital marketing. Get a free consultation.",
  keywords: ["web development services", "AI chatbot development", "custom software", "digital marketing agency", "tech solutions"],
};

export default function ServicesPage() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From websites to AI chatbots to custom software, we build technology
            solutions that help businesses grow and succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group bg-white rounded-xl border border-slate-200 p-8 hover:border-orange-300 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h2 className="text-xl font-semibold text-slate-900 group-hover:text-orange-500 mb-3">
                {service.name}
              </h2>
              <p className="text-slate-600">{service.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Not Sure What You Need?
          </h2>
          <p className="text-slate-600 mb-6">
            Schedule a free consultation and we will help you find the right solution.
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
