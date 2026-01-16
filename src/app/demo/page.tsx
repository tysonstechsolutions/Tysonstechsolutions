import Link from 'next/link'
import { demoServices } from '@/data/chatbot-configs'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free AI Chatbot Demo - Try It Now, No Sign Up Required',
  description: 'Try our AI chatbot demos FREE - no email, no sign up, no credit card. See how contractors capture leads 24/7. Works for paving, lawn care, roofing & 15+ industries.',
  keywords: [
    'free AI chatbot demo',
    'chatbot demo no sign up',
    'try AI chatbot free',
    'contractor chatbot demo',
    'lead generation chatbot demo',
    'service business chatbot',
    'AI chatbot for contractors',
    'free chatbot trial',
  ],
  openGraph: {
    title: 'Free AI Chatbot Demo - No Sign Up Required | TysonsTechSolutions',
    description: 'Try our AI chatbot demos FREE. No email required. See how service contractors capture leads 24/7 with instant quotes.',
    type: 'website',
  },
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2.5 px-4 text-center text-sm">
        <Link href="/pricing" className="hover:underline">
          <span className="font-bold">Founding Member Special:</span>
          {" "}Buy 1st month, get 2nd month FREE! Limited spots available.
          {" "}<span className="underline">See deals →</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="fixed top-10 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-orange-500">
            TysonsTechSolutions
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/services" className="text-slate-300 hover:text-orange-500">
              Services
            </Link>
            <Link href="/industries" className="text-slate-300 hover:text-orange-500">
              Industries
            </Link>
            <Link href="/pricing" className="text-slate-300 hover:text-orange-500">
              Pricing
            </Link>
            <Link href="/demo" className="text-orange-500 font-medium">
              Demos
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

      {/* Hero */}
      <section className="pt-40 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-green-500/20 text-green-400 px-5 py-2.5 rounded-full text-sm font-medium mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            100% Free - No Sign Up Required
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Try Our AI Chatbots Right Now
            <br />
            <span className="text-orange-500">No Email. No Credit Card. Just Click.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-4">
            Pick any demo below and start chatting. This is exactly what your customers would see on YOUR website.
            Every conversation = a qualified lead with name, phone, address, and project details.
          </p>
          <p className="text-lg text-orange-400 font-medium mb-8">
            See it work in 30 seconds. One booking pays for months of service.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-full">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Instant Estimates
            </span>
            <span className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-full">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              24/7 Lead Capture
            </span>
            <span className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-full">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              AI Satellite Measurement
            </span>
            <span className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-full">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              SMS Notifications
            </span>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-orange-500">47%</div>
              <div className="text-sm text-slate-400">of visitors come after hours</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-500">$250+</div>
              <div className="text-sm text-slate-400">avg job captured per lead</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-500">3 min</div>
              <div className="text-sm text-slate-400">average time to get quote</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Choose Your Industry</h2>
            <p className="text-slate-400">Each demo is customized with real services and pricing</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {demoServices.map((service, index) => (
              <Link
                key={service.id}
                href={`/demo/${service.id}`}
                className="group bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-orange-500 hover:bg-slate-800/80 transition-all relative"
              >
                {index < 3 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-white group-hover:text-orange-500 mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-slate-400 mb-4">{service.description}</p>
                <span className="text-orange-500 text-sm font-medium group-hover:underline">
                  Try Demo →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            The Math is Simple
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="text-4xl font-bold">$99</div>
              <div className="text-orange-100">Starting monthly cost</div>
              <div className="text-xs text-orange-200 mt-1">(Starter plan)</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="text-4xl font-bold">1 lead</div>
              <div className="text-orange-100">captured per month</div>
              <div className="text-xs text-orange-200 mt-1">(that you would have missed)</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="text-4xl font-bold">$250+</div>
              <div className="text-orange-100">average job value</div>
              <div className="text-xs text-orange-200 mt-1">(in your pocket)</div>
            </div>
          </div>
          <p className="text-xl text-orange-100 mb-6">
            That's a <span className="font-bold text-white">250%+ return</span> from capturing just ONE extra lead per month.
            <br />Most customers capture 5-10+ leads per month.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-white text-orange-500 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-colors"
          >
            See Full Pricing Breakdown →
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Service Businesses Love This
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Stop losing leads to competitors who answer faster. Our AI works 24/7.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌙</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Captures After-Hours Leads</h3>
              <p className="text-slate-400">
                47% of website visitors come between 6pm and 8am. Without a chatbot, they leave and call your competitor in the morning.
              </p>
            </div>
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Instant Quotes = More Closes</h3>
              <p className="text-slate-400">
                People who get instant quotes are 3x more likely to book. No more "I'll get back to you" that turns into lost leads.
              </p>
            </div>
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">SMS Alert = Fast Response</h3>
              <p className="text-slate-400">
                Get a text the moment someone submits. Call them back in 5 minutes while they're still thinking about you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-slate-400 mb-6">WHAT CONTRACTORS ARE SAYING</div>
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
            <p className="text-xl text-white italic mb-6">
              "I got 3 bookings in my first week from people who visited my site at 11pm.
              That alone paid for 6 months of service. This thing pays for itself."
            </p>
            <div className="text-slate-400">
              - Mike R., Lawn Care Business Owner
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Plans Starting at $99/month
          </div>
          <h2 className="text-3xl font-bold text-white mb-6">
            Get Your Own Custom Chatbot
          </h2>
          <p className="text-slate-300 mb-4 text-lg">
            Starter $99/mo · Growth $249/mo · Pro $499/mo
          </p>
          <p className="text-slate-400 mb-8">
            Includes custom branding, your services & pricing, SMS notifications, and everything you saw in the demos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg"
            >
              Get Started
            </Link>
            <Link
              href="/pricing"
              className="border-2 border-slate-600 hover:border-orange-500 text-white px-8 py-4 rounded-lg font-medium text-lg"
            >
              See What's Included
            </Link>
          </div>
          <p className="text-slate-500 mt-4 text-sm">
            Cancel anytime. No contracts.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-700">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p>© 2026 TysonsTechSolutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
