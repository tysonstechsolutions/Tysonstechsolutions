import Link from "next/link";

const footerLinks = {
  product: [
    { name: "Try Demo", href: "/demo" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Industries", href: "/industries" },
  ],
  compare: [
    { name: "vs Angi", href: "/compare/angi-alternative" },
    { name: "vs Thumbtack", href: "/compare/thumbtack-alternative" },
    { name: "vs Jobber", href: "/compare/jobber-alternative" },
  ],
  locations: [
    { name: "New York", href: "/locations/new-york" },
    { name: "Los Angeles", href: "/locations/los-angeles" },
    { name: "Chicago", href: "/locations/chicago" },
    { name: "Houston", href: "/locations/houston" },
    { name: "All Locations", href: "/locations" },
  ],
  company: [
    { name: "Blog", href: "/blog" },
    { name: "Sign Up", href: "/signup" },
    { name: "Log In", href: "/login" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* CTA Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Stop Losing Leads to Competitors
            </h3>
            <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
              Every visitor that leaves without contacting you is money in someone else's pocket.
              Our AI chatbot captures leads 24/7 - even while you sleep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
              >
                See It In Action
              </Link>
              <Link
                href="/signup"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Get Started →
              </Link>
            </div>
            <p className="text-orange-200 text-sm mt-4">
              Plans starting at $99/month
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-bold mb-4">TysonsTechSolutions</div>
            <p className="text-slate-400 text-sm mb-4">
              AI-powered lead generation for service contractors. Replace 10+ apps with one.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-400">●</span>
              <span className="text-slate-400">Saves customers $4,200+/year</span>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-4">Product</div>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-4">Compare</div>
            <ul className="space-y-2">
              {footerLinks.compare.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-4">Top Cities</div>
            <ul className="space-y-2">
              {footerLinks.locations.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-4">Company</div>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <div>© {new Date().getFullYear()} TysonsTechSolutions. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="text-orange-500">💬</span>
              <span>24/7 AI Support</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>30-day guarantee</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
