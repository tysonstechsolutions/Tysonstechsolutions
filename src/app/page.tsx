import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-orange-500">TysonsTechSolutions</div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-slate-600 hover:text-orange-500">Features</Link>
            <Link href="#pricing" className="text-slate-600 hover:text-orange-500">Pricing</Link>
            <Link href="/login" className="text-slate-600 hover:text-orange-500">Log In</Link>
          </div>
          <Link href="/signup" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-medium">Start Free Trial</Link>
        </div>
      </nav>
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-6">AI-Powered Lead Generation</div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">AI-Powered Tools for<br /><span className="text-orange-500">Service Contractors</span></h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">Get more leads, send instant quotes, and close more jobs. Our AI chatbot responds instantly, measures the job, and gives quotes in seconds.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg">Start Free 14-Day Trial</Link>
            <Link href="#demo" className="border-2 border-slate-300 hover:border-orange-500 text-slate-700 px-8 py-4 rounded-lg font-medium text-lg">See It In Action</Link>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">You are losing leads because you cannot respond fast enough</h2>
            <p className="text-slate-300 text-lg mb-6">78% of customers go with the first contractor who responds.</p>
            <div className="bg-slate-800 rounded-xl p-6">
              <p className="text-orange-400 font-semibold mb-2">The Solution:</p>
              <p className="text-slate-300">Our AI chatbot responds instantly 24/7, qualifies leads, measures the job using satellite imagery, and sends quotes automatically.</p>
            </div>
          </div>
          <div className="bg-slate-800 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-4"><div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center text-2xl">⚡</div><div><div className="text-2xl font-bold">2 seconds</div><div className="text-slate-400">Average response time</div></div></div>
            <div className="flex items-center gap-4"><div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center text-2xl">📈</div><div><div className="text-2xl font-bold">3x more leads</div><div className="text-slate-400">Than traditional forms</div></div></div>
          </div>
        </div>
      </section>
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8 mt-12">
            <div className="bg-white border border-slate-200 rounded-xl p-6"><div className="text-4xl mb-4">💬</div><h3 className="text-xl font-semibold mb-2">AI Chat Widget</h3><p className="text-slate-600">Embeds on your website and qualifies leads automatically.</p></div>
            <div className="bg-white border border-slate-200 rounded-xl p-6"><div className="text-4xl mb-4">🛰️</div><h3 className="text-xl font-semibold mb-2">Satellite Measurement</h3><p className="text-slate-600">AI detects and measures the surface area instantly.</p></div>
            <div className="bg-white border border-slate-200 rounded-xl p-6"><div className="text-4xl mb-4">💰</div><h3 className="text-xl font-semibold mb-2">Automatic Quotes</h3><p className="text-slate-600">AI generates accurate estimates for every lead.</p></div>
            <div className="bg-white border border-slate-200 rounded-xl p-6"><div className="text-4xl mb-4">📱</div><h3 className="text-xl font-semibold mb-2">SMS Alerts</h3><p className="text-slate-600">Get notified instantly. Reply via text.</p></div>
          </div>
        </div>
      </section>
      <section id="pricing" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="rounded-2xl p-8 bg-white border border-slate-200"><div className="text-xl font-semibold mb-2">Starter</div><div className="mb-6"><span className="text-4xl font-bold">$99</span>/mo</div><ul className="space-y-2 text-slate-600 mb-8"><li>500 conversations/mo</li><li>50 leads/month</li></ul><Link href="/signup" className="block w-full py-3 rounded-lg font-medium text-center bg-orange-500 text-white">Start Trial</Link></div>
            <div className="rounded-2xl p-8 bg-orange-500 text-white ring-4 ring-orange-500 ring-offset-2"><div className="text-sm text-orange-200 mb-2">RECOMMENDED</div><div className="text-xl font-semibold mb-2">Growth</div><div className="mb-6"><span className="text-4xl font-bold">$249</span>/mo</div><ul className="space-y-2 text-orange-100 mb-8"><li>2,000 conversations/mo</li><li>200 leads/month</li><li>SMS notifications</li></ul><Link href="/signup" className="block w-full py-3 rounded-lg font-medium text-center bg-white text-orange-500">Start Trial</Link></div>
            <div className="rounded-2xl p-8 bg-white border border-slate-200"><div className="text-xl font-semibold mb-2">Pro</div><div className="mb-6"><span className="text-4xl font-bold">$499</span>/mo</div><ul className="space-y-2 text-slate-600 mb-8"><li>Unlimited conversations</li><li>500 leads/month</li></ul><Link href="/signup" className="block w-full py-3 rounded-lg font-medium text-center bg-orange-500 text-white">Start Trial</Link></div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to 10x Your Lead Response?</h2>
          <Link href="/signup" className="inline-block bg-white text-orange-500 px-8 py-4 rounded-lg font-medium text-lg">Get Started Free</Link>
        </div>
      </section>
      <footer className="py-12 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-xl font-bold mb-4">TysonsTechSolutions</div>
          <p className="text-slate-400">AI-powered tools for service contractors.</p>
          <p className="text-slate-500 mt-8">© 2026 TysonsTechSolutions</p>
        </div>
      </footer>
    </div>
  );
}
