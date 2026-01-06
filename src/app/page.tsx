import Link from "next/link";
import { services } from "@/data/services";
import { industries } from "@/data/industries";

export default function Home() {
  const topServices = services.slice(0, 6);
  const topIndustries = industries.slice(0, 8);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-orange-500">
            TysonsTechSolutions
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/services" className="text-slate-600 hover:text-orange-500">
              Services
            </Link>
            <Link href="/industries" className="text-slate-600 hover:text-orange-500">
              Industries
            </Link>
            <Link href="/pricing" className="text-slate-600 hover:text-orange-500">
              Pricing
            </Link>
            <Link href="/blog" className="text-slate-600 hover:text-orange-500">
              Blog
            </Link>
            <Link href="/demo" className="text-orange-500 font-medium">
              Demos
            </Link>
            <Link href="/login" className="text-slate-600 hover:text-orange-500">
              Log In
            </Link>
          </div>
          <Link
            href="/signup"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-medium"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-6">
              Web Development | AI Chatbots | Custom Software
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Technology Solutions That
              <br />
              <span className="text-orange-500">Grow Your Business</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
              From stunning websites to intelligent chatbots to custom software,
              we build technology that helps businesses attract customers, save time,
              and increase revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg"
              >
                Get Free Consultation
              </Link>
              <Link
                href="/services"
                className="border-2 border-slate-300 hover:border-orange-500 text-slate-700 px-8 py-4 rounded-lg font-medium text-lg"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white">$4,200+</div>
              <div className="text-slate-400">Avg. Yearly Savings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">16+</div>
              <div className="text-slate-400">Industries Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-slate-400">Lead Capture</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">3 min</div>
              <div className="text-slate-400">Avg. Quote Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive technology solutions to help your business thrive in the digital age.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white border border-slate-200 rounded-xl p-8 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-orange-500 mb-3">
                  {service.name}
                </h3>
                <p className="text-slate-600">{service.description}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-block border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Why Businesses Choose TysonsTechSolutions
              </h2>
              <p className="text-slate-600 text-lg mb-8">
                We combine technical expertise with business understanding to deliver
                solutions that actually drive results. No jargon, no unnecessary complexity
                - just technology that works.
              </p>
              <ul className="space-y-4">
                {[
                  "Custom solutions tailored to your specific needs",
                  "Transparent pricing with no hidden fees",
                  "Fast delivery without compromising quality",
                  "Ongoing support and maintenance included",
                  "Modern technology stack and best practices",
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
              <h3 className="text-2xl font-bold mb-6">Our Process</h3>
              <div className="space-y-6">
                {[
                  { step: "1", title: "Discovery", desc: "We learn about your business and goals" },
                  { step: "2", title: "Strategy", desc: "We create a detailed plan and timeline" },
                  { step: "3", title: "Development", desc: "We build your solution with regular updates" },
                  { step: "4", title: "Launch", desc: "We deploy and provide ongoing support" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-orange-100 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We build technology solutions for businesses across 40+ industries.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {topIndustries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group bg-white border border-slate-200 rounded-xl p-6 text-center hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-3">{industry.icon}</div>
                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-orange-500">
                  {industry.name}
                </h3>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/industries"
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              View All Industries →
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include our core features.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="rounded-2xl p-8 bg-slate-800 border border-slate-700">
              <div className="text-xl font-semibold mb-2">Starter</div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-slate-400">/mo</span>
              </div>
              <ul className="space-y-3 text-slate-300 mb-8">
                <li>Basic website</li>
                <li>500 chatbot conversations</li>
                <li>Email support</li>
              </ul>
              <Link
                href="/signup"
                className="block w-full py-3 rounded-lg font-medium text-center bg-slate-700 hover:bg-slate-600 text-white"
              >
                Get Started
              </Link>
            </div>
            <div className="rounded-2xl p-8 bg-orange-500 ring-4 ring-orange-500 ring-offset-4 ring-offset-slate-900">
              <div className="text-sm text-orange-200 mb-2">MOST POPULAR</div>
              <div className="text-xl font-semibold mb-2">Growth</div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$249</span>
                <span className="text-orange-200">/mo</span>
              </div>
              <ul className="space-y-3 text-orange-100 mb-8">
                <li>Custom website</li>
                <li>2,000 chatbot conversations</li>
                <li>Priority support</li>
                <li>Monthly analytics</li>
              </ul>
              <Link
                href="/signup"
                className="block w-full py-3 rounded-lg font-medium text-center bg-white text-orange-500 hover:bg-orange-50"
              >
                Get Started
              </Link>
            </div>
            <div className="rounded-2xl p-8 bg-slate-800 border border-slate-700">
              <div className="text-xl font-semibold mb-2">Pro</div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$499</span>
                <span className="text-slate-400">/mo</span>
              </div>
              <ul className="space-y-3 text-slate-300 mb-8">
                <li>Advanced web application</li>
                <li>Unlimited conversations</li>
                <li>Dedicated support</li>
                <li>Custom integrations</li>
              </ul>
              <Link
                href="/signup"
                className="block w-full py-3 rounded-lg font-medium text-center bg-slate-700 hover:bg-slate-600 text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/pricing"
              className="text-orange-400 hover:text-orange-300 font-medium"
            >
              View Full Pricing Details →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Get a free consultation and discover how we can help you grow with technology.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-orange-500 px-8 py-4 rounded-lg font-medium text-lg hover:bg-orange-50"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-xl font-bold text-orange-500 mb-4">TysonsTechSolutions</div>
              <p className="text-slate-400">
                Technology solutions that grow your business. Web development, AI chatbots,
                custom software, and more.
              </p>
            </div>
            <div>
              <div className="font-semibold mb-4">Services</div>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/services/web-development" className="hover:text-white">Web Development</Link></li>
                <li><Link href="/services/ai-chatbots" className="hover:text-white">AI Chatbots</Link></li>
                <li><Link href="/services/custom-software" className="hover:text-white">Custom Software</Link></li>
                <li><Link href="/services/seo-services" className="hover:text-white">SEO Services</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-4">Company</div>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/industries" className="hover:text-white">Industries</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/locations" className="hover:text-white">Locations</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-4">Get Started</div>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/signup" className="hover:text-white">Free Consultation</Link></li>
                <li><Link href="/login" className="hover:text-white">Client Login</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500">
            <p>© 2026 TysonsTechSolutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
