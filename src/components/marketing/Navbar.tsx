"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "Industries", href: "/industries" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

interface PromoStatus {
  active: boolean;
  spotsRemaining: number;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [promo, setPromo] = useState<PromoStatus | null>(null);

  useEffect(() => {
    fetch("/api/promo/founding")
      .then((res) => res.json())
      .then((data) => setPromo(data))
      .catch(() => setPromo({ active: true, spotsRemaining: 14 }));
  }, []);

  const showPromo = promo?.active && (promo?.spotsRemaining ?? 0) > 0;

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-orange-500">
            TysonsTechSolutions
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-600 hover:text-orange-500 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-slate-600 hover:text-orange-500">
              Log In
            </Link>
            <Link
              href={showPromo ? "/signup?promo=FOUNDING50" : "/signup"}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-medium transition-colors relative group"
            >
              {showPromo ? (
                <>
                  <span>Get 50% Off</span>
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full animate-pulse">
                    {promo?.spotsRemaining} left
                  </span>
                </>
              ) : (
                "Start Free Trial"
              )}
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-slate-600 hover:text-orange-500"
              onClick={() => setMobileOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-200 space-y-3">
            <Link href="/login" className="block text-slate-600">Log In</Link>
            <Link
              href={showPromo ? "/signup?promo=FOUNDING50" : "/signup"}
              className="block bg-orange-500 text-white text-center py-2 rounded-lg font-medium"
            >
              {showPromo ? `Get 50% Off (${promo?.spotsRemaining} spots left)` : "Start Free Trial"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
