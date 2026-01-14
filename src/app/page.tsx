"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import LifetimeProPopup from "@/components/LifetimeProPopup";

export default function Home() {
  const topServices = services.slice(0, 6);
  const topIndustries = industries.slice(0, 8);
  const [showPopup, setShowPopup] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("lifetime_popup_seen");
    if (!hasSeenPopup) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    localStorage.setItem("lifetime_popup_seen", "true");
  };

  const handleCheckout = async (plan: string, applyPromo: boolean = false) => {
    setLoadingPlan(plan);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, applyFoundingPromo: applyPromo }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data);
        alert(data.error || "Something went wrong");
        setLoadingPlan(null);
      }
    } catch (err) {
      console.error("Checkout fetch error:", err);
      alert("Something went wrong - check console for details");
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Lifetime Pro Popup */}
      <LifetimeProPopup isOpen={showPopup} onClose={handleClosePopup} />

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

      {/* Hero Section - PRICING FIRST */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              AI-Powered Business Tools <span className="text-orange-400">Starting at $99/mo</span>
            </h1>
            <p className="text-slate-300">
              Chatbots, websites, CRM, invoicing - everything you need to grow.
            </p>
          </div>

          {/* Pricing Cards - Front and Center */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter */}
            <button
              onClick={() => handleCheckout("starter")}
              disabled={loadingPlan !== null}
              className="block rounded-2xl p-6 bg-slate-800 border border-slate-700 hover:border-orange-500 hover:scale-[1.02] transition-all cursor-pointer text-left disabled:opacity-70 disabled:cursor-wait"
            >
              <div className="text-lg font-semibold text-white mb-1">Starter</div>
              <div className="text-sm text-slate-400 mb-3">AI Chatbot Only</div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">$99</span>
                <span className="text-slate-400">/mo</span>
              </div>
              <ul className="space-y-2 text-slate-300 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI Chat Widget
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Lead Capture
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Satellite Measurement
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited Conversations
                </li>
              </ul>
              <div className="w-full py-3 rounded-lg font-medium text-center bg-slate-700 text-white transition-colors">
                {loadingPlan === "starter" ? "Loading..." : "Get Started"}
              </div>
            </button>

            {/* Growth - Most Popular */}
            <button
              onClick={() => handleCheckout("growth", true)}
              disabled={loadingPlan !== null}
              className="block rounded-2xl p-6 bg-orange-500 ring-4 ring-orange-500 ring-offset-4 ring-offset-slate-900 relative hover:scale-[1.02] hover:ring-orange-400 transition-all cursor-pointer text-left disabled:opacity-70 disabled:cursor-wait"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-orange-500 px-3 py-1 rounded-full text-xs font-bold">
                MOST POPULAR
              </div>
              <div className="text-lg font-semibold text-white mb-1">Growth</div>
              <div className="text-sm text-orange-200 mb-3">Chatbot + Full Website</div>
              <div className="mb-2">
                <span className="text-3xl font-bold text-white">$249</span>
                <span className="text-orange-200">/mo</span>
              </div>
              {/* First 10 bonus */}
              <div className="bg-white/20 rounded-lg p-2 mb-4 text-xs">
                <div className="text-white font-semibold">First 10 customers:</div>
                <div className="text-orange-100">Buy 1st month, get 2nd month FREE!</div>
              </div>
              <ul className="space-y-2 text-orange-100 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Everything in Starter
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Professional Website
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Online Booking System
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority Support
                </li>
              </ul>
              <div className="w-full py-3 rounded-lg font-medium text-center bg-white text-orange-500 transition-colors">
                {loadingPlan === "growth" ? "Loading..." : "Get Started"}
              </div>
            </button>

            {/* Pro */}
            <div className="rounded-2xl p-6 bg-slate-800 border border-slate-700 hover:border-orange-500 hover:scale-[1.02] transition-all relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                LIFETIME DEAL
              </div>
              <div className="text-lg font-semibold text-white mb-1">Pro</div>
              <div className="text-sm text-slate-400 mb-3">Full Business Platform</div>
              <div className="mb-2">
                <span className="text-3xl font-bold text-white">$499</span>
                <span className="text-slate-400">/mo</span>
              </div>
              {/* First 10 bonus */}
              <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-2 mb-4 text-xs">
                <div className="text-amber-400 font-semibold">First 10 customers:</div>
                <div className="text-slate-300">Buy 1st month, get 2nd month FREE!</div>
              </div>
              <ul className="space-y-2 text-slate-300 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Everything in Growth
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Admin Dashboard & CRM
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Invoice & Expense Tracking
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  SEO & Review Automation
                </li>
              </ul>
              <button
                onClick={() => handleCheckout("pro", true)}
                disabled={loadingPlan !== null}
                className="w-full py-3 rounded-lg font-medium text-center bg-slate-700 hover:bg-slate-600 text-white transition-colors mb-2 disabled:opacity-70 disabled:cursor-wait"
              >
                {loadingPlan === "pro" ? "Loading..." : "Get Started - $499/mo"}
              </button>
              <button
                onClick={() => handleCheckout("lifetime")}
                disabled={loadingPlan !== null}
                className="w-full py-2 rounded-lg font-medium text-center text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white transition-colors disabled:opacity-70 disabled:cursor-wait"
              >
                {loadingPlan === "lifetime" ? "Loading..." : "Or Get Lifetime - $1,499"}
              </button>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/pricing"
              className="text-orange-400 hover:text-orange-300 font-medium"
            >
              View Full Pricing Details & ROI Calculator →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-10 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-slate-900">$4,200+</div>
              <div className="text-slate-500">Avg. Yearly Savings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">16+</div>
              <div className="text-slate-500">Industries Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">24/7</div>
              <div className="text-slate-500">Lead Capture</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">3 min</div>
              <div className="text-slate-500">Avg. Quote Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Grow
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Stop paying for 10 different apps. Get everything in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Chatbot</h3>
              <p className="text-slate-600">
                24/7 lead capture with intelligent conversations. Never miss another late-night customer again.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Professional Website</h3>
              <p className="text-slate-600">
                Mobile-optimized website with booking system, service areas, and Google Maps integration.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Business Dashboard</h3>
              <p className="text-slate-600">
                CRM, invoicing, expense tracking, and SEO reports - all in one powerful dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive technology solutions to help your business thrive.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white border border-slate-200 rounded-xl p-6 hover:border-orange-300 hover:shadow-lg transition-all"
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
              className="inline-block border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Why Businesses Choose Us
              </h2>
              <p className="text-slate-600 text-lg mb-8">
                We combine technical expertise with business understanding to deliver
                solutions that actually drive results.
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
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We build technology solutions for businesses across 40+ industries.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topIndustries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group bg-white border border-slate-200 rounded-xl p-4 text-center hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="text-2xl mb-2">{industry.icon}</div>
                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-orange-500">
                  {industry.name}
                </h3>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/industries"
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              View All Industries →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Get started today. One booking pays for months of service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup?plan=pro&offer=lifetime"
              className="inline-block bg-white text-orange-500 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 shadow-lg"
            >
              Get Lifetime Pro Access
            </Link>
            <Link
              href="/signup"
              className="inline-block bg-orange-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-orange-700 border-2 border-orange-400"
            >
              Get Started
            </Link>
          </div>
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
