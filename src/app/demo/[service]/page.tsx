import { notFound } from 'next/navigation'
import Link from 'next/link'
import { allConfigs, demoServices, ServiceType } from '@/data/chatbot-configs'
import DemoChatbotWrapper from './DemoChatbotWrapper'

interface PageProps {
  params: Promise<{ service: string }>
}

export async function generateStaticParams() {
  return demoServices.map((service) => ({
    service: service.id,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { service } = await params
  const serviceInfo = demoServices.find(s => s.id === service)

  if (!serviceInfo) {
    return { title: 'Demo Not Found' }
  }

  return {
    title: `${serviceInfo.name} Chatbot Demo | TysonsTechSolutions`,
    description: `Try our AI-powered ${serviceInfo.name.toLowerCase()} chatbot. See how it captures leads, provides instant quotes, and books appointments.`,
  }
}

export default async function ServiceDemoPage({ params }: PageProps) {
  const { service } = await params
  const config = allConfigs[service as ServiceType]
  const serviceInfo = demoServices.find(s => s.id === service)

  if (!config || !serviceInfo) {
    notFound()
  }

  // Get related services (excluding current)
  const relatedServices = demoServices
    .filter(s => s.id !== service)
    .slice(0, 6)

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-orange-500">
            TysonsTechSolutions
          </Link>
          <div className="flex items-center gap-4 sm:gap-8">
            <Link href="/demo" className="text-orange-500 font-medium text-sm sm:text-base">
              ← All Demos
            </Link>
            <Link
              href="/signup"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              href="/demo"
              className="inline-flex items-center text-slate-400 hover:text-orange-500 mb-4 text-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Demos
            </Link>
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-4xl">{serviceInfo.icon}</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {serviceInfo.name} Chatbot
              </h1>
            </div>
            <p className="text-slate-400 max-w-xl mx-auto">
              Try the interactive demo below. This is exactly how your customers would experience the chatbot on your website.
            </p>
          </div>

          {/* Demo Container */}
          <div className="max-w-md mx-auto mb-12">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
              {/* Browser Chrome */}
              <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 ml-3">
                  <div className="bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-400 text-center">
                    demo-{service}.example.com
                  </div>
                </div>
              </div>

              {/* Chatbot Container */}
              <div className="h-[550px]">
                <DemoChatbotWrapper service={service} inline={true} />
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
                <span className="text-xl">💬</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Conversational Flow</h3>
              <p className="text-slate-400 text-sm">
                Natural conversation that guides customers through the quoting process step by step.
              </p>
            </div>
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
                <span className="text-xl">💰</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Instant Pricing</h3>
              <p className="text-slate-400 text-sm">
                Calculates price estimates based on your rates and the customer&apos;s inputs.
              </p>
            </div>
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-3">
                <span className="text-xl">📱</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Lead Capture</h3>
              <p className="text-slate-400 text-sm">
                Collects name, phone, address, and project details. You get notified instantly.
              </p>
            </div>
          </div>

          {/* Services Included */}
          <div className="max-w-2xl mx-auto mb-12">
            <h2 className="text-xl font-bold text-white mb-4 text-center">Services in This Demo</h2>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {config.services.map((svc) => (
                  <div key={svc.id} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-2xl">{svc.emoji}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{svc.name}</div>
                      <div className="text-slate-400 text-xs">
                        {svc.unit === 'sqft' && `$${svc.pricePerUnit}/sq ft`}
                        {svc.unit === 'linear_ft' && `$${svc.pricePerUnit}/linear ft`}
                        {svc.unit === 'each' && `Starting at $${svc.minPrice}`}
                        {svc.unit === 'hour' && `$${svc.pricePerUnit}/hr`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-xl mx-auto text-center mb-12">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-2">Want This For Your Business?</h2>
              <p className="text-orange-100 mb-4 text-sm">
                We&apos;ll customize this chatbot with your branding, services, and pricing.
              </p>
              <Link
                href="/signup"
                className="inline-block bg-white text-orange-500 px-6 py-3 rounded-lg font-medium hover:bg-orange-50"
              >
                Get Free Consultation
              </Link>
            </div>
          </div>

          {/* Related Demos */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6 text-center">Try Other Demos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedServices.map((related) => (
                <Link
                  key={related.id}
                  href={`/demo/${related.id}`}
                  className="group bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-orange-500 transition-all text-center"
                >
                  <div className="text-2xl mb-2">{related.icon}</div>
                  <div className="text-white text-sm font-medium group-hover:text-orange-500">
                    {related.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-700">
        <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm">
          <p>© 2026 TysonsTechSolutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
