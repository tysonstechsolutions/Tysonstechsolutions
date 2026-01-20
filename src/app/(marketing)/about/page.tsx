import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - Who We Are",
  description: "Learn about TysonsTechSolutions - the team behind your next website, AI chatbot, or custom software solution. We build technology that grows businesses.",
  keywords: [
    "about TysonsTechSolutions",
    "web development team",
    "technology company",
    "software developers",
  ],
  alternates: {
    canonical: "https://tysonstechsolutions.com/about",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tyson",
  jobTitle: "Founder & Lead Developer",
  description: "Full-stack developer specializing in modern web applications, AI integrations, and business automation. Passionate about building technology that helps small businesses compete with the big guys.",
  worksFor: {
    "@type": "Organization",
    "@id": "https://tysonstechsolutions.com/#organization",
    name: "TysonsTechSolutions",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "AI/ML",
    "Node.js",
    "Web Development",
    "Custom Software",
    "Business Automation",
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://tysonstechsolutions.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: "https://tysonstechsolutions.com/about",
    },
  ],
};

const values = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Honest Pricing",
    description: "No hidden fees, no surprise charges. What we quote is what you pay. We believe trust is built through transparency.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Real Results",
    description: "We don't just build pretty websites. We build tools that generate leads, save time, and grow your business.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Personal Service",
    description: "You work directly with us, not a rotating cast of account managers. Your success is our success.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Modern Technology",
    description: "We use the latest frameworks and AI tools - not outdated WordPress templates. Your site will be fast, secure, and scalable.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technology That Works for <span className="text-orange-400">You</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            We're not a big agency with layers of account managers. We're builders who work directly with you to create technology that actually grows your business.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              TysonsTechSolutions was born from a simple observation: small businesses were being overcharged for mediocre websites and complicated software they didn't need.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              We saw contractors paying thousands for basic websites. Service businesses juggling 10 different apps for scheduling, invoicing, and customer management. And everyone struggling with the same question: <em>"Why is this so complicated?"</em>
            </p>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              So we built something better. A modern technology platform that gives small businesses the same powerful tools that big companies use - at a price that makes sense. Websites that actually generate leads. AI chatbots that answer customer questions 24/7. Dashboards that make running your business easier, not harder.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed">
              Today, our clients range from local service contractors to growing businesses across the country. But our approach hasn't changed: build honest technology that delivers real results.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet the Team</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Small team. Big results. When you work with us, you work with us directly.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            {/* Team Member Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 h-32"></div>
              <div className="px-8 pb-8 -mt-16 text-center">
                <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-4 border-4 border-white shadow-lg flex items-center justify-center">
                  <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Tyson</h3>
                <p className="text-orange-500 font-medium mb-4">Founder & Lead Developer</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Full-stack developer specializing in modern web applications, AI integrations, and business automation.
                  Passionate about building technology that helps small businesses compete with the big guys.
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm">React/Next.js</span>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm">AI/ML</span>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm">Node.js</span>
                </div>
              </div>
            </div>

            <p className="text-center text-slate-500 mt-8 text-sm">
              Photo coming soon - I'm better with code than selfies!
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What We Believe</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              These aren't just words on a wall. They're how we operate every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="flex gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 text-orange-500">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-16 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Clients Choose Us</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="text-orange-400 font-bold text-lg">01</div>
                  <div>
                    <h3 className="font-semibold mb-1">No Agency Bloat</h3>
                    <p className="text-slate-400">You work directly with the person building your project. No account managers, no miscommunication.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-orange-400 font-bold text-lg">02</div>
                  <div>
                    <h3 className="font-semibold mb-1">Modern Technology</h3>
                    <p className="text-slate-400">We use React, Next.js, and AI - not outdated page builders. Your site will be fast and future-proof.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-orange-400 font-bold text-lg">03</div>
                  <div>
                    <h3 className="font-semibold mb-1">Fair Pricing</h3>
                    <p className="text-slate-400">We charge what's fair, not what the market will bear. Our $99-499/mo plans include things others charge thousands for.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-orange-400 font-bold text-lg">04</div>
                  <div>
                    <h3 className="font-semibold mb-1">Real Support</h3>
                    <p className="text-slate-400">Questions? Issues? You can actually reach us. No ticket systems, no waiting days for a response.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">The Numbers</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400">Client Satisfaction</span>
                    <span className="text-orange-400 font-bold">100%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400">Projects Delivered On Time</span>
                    <span className="text-orange-400 font-bold">100%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400">Average Savings vs Agencies</span>
                    <span className="text-orange-400 font-bold">70%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Let's talk about what you're building. No sales pitch - just an honest conversation about how we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-orange-500 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 shadow-lg"
            >
              Get in Touch
            </Link>
            <Link
              href="/portfolio"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white/10"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
