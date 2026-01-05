import Link from "next/link";

const footerLinks = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Industries", href: "/industries" },
    { name: "All Locations", href: "/locations" },
  ],
  compare: [
    { name: "Angi Alternative", href: "/compare/angi-alternative" },
    { name: "Thumbtack Alternative", href: "/compare/thumbtack-alternative" },
    { name: "Asphalt Contractors", href: "/industries/asphalt-contractors" },
  ],
  locations: [
    { name: "New York", href: "/locations/new-york" },
    { name: "Los Angeles", href: "/locations/los-angeles" },
    { name: "Chicago", href: "/locations/chicago" },
    { name: "Houston", href: "/locations/houston" },
    { name: "Dallas", href: "/locations/dallas" },
    { name: "Miami", href: "/locations/miami" },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-bold mb-4">TysonsTechSolutions</div>
            <p className="text-slate-400 text-sm">
              AI-powered lead generation for service contractors across America.
            </p>
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
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} TysonsTechSolutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
