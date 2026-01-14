"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface LifetimeProPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PromoStatus {
  active: boolean;
  deals: {
    lifetime: {
      active: boolean;
      spotsRemaining: number;
    };
  };
}

export default function LifetimeProPopup({ isOpen, onClose }: LifetimeProPopupProps) {
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    fetch("/api/promo/founding")
      .then((res) => res.json())
      .then((data: PromoStatus) => {
        if (data.deals?.lifetime?.active) {
          setSpotsLeft(data.deals.lifetime.spotsRemaining);
        } else {
          setSpotsLeft(0);
        }
      })
      .catch(() => setSpotsLeft(10));
  }, [isOpen]);

  if (!isOpen) return null;

  // Don't show if no spots left
  if (spotsLeft === 0) {
    onClose();
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 pt-8 pb-6 text-white text-center">
          <div className="inline-block bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium mb-4">
            LIMITED TIME OFFER
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Get Lifetime Pro Access
          </h2>
          <p className="text-orange-100">
            Pay once, use forever. No monthly fees.
          </p>
        </div>

        {/* Spots Remaining */}
        <div className="bg-slate-900 py-4 px-8">
          <div className="text-center">
            <div className="text-xs text-slate-400 mb-2">FOUNDING MEMBER SPOTS</div>
            <div className="flex justify-center items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <div className="text-2xl font-bold text-white">
                Only {spotsLeft ?? '...'} of 10 spots left
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Price */}
          <div className="text-center mb-6">
            <div className="text-sm text-slate-500 mb-1">One-time payment</div>
            <div className="text-5xl font-bold text-slate-900">$1,499</div>
            <div className="text-sm text-green-600 font-medium mt-1">
              vs $5,988/year paying monthly - save $4,489 year one
            </div>
          </div>

          {/* Features */}
          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <div className="text-sm font-semibold text-slate-900 mb-3">Everything in Pro, forever:</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                "AI Chat Widget",
                "Professional Website",
                "Online Booking",
                "Admin Dashboard",
                "Customer CRM",
                "Invoice Management",
                "Expense Tracking",
                "SEO Reports",
                "Review Automation",
                "Dedicated Support",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-slate-600">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href="/signup?plan=lifetime"
            onClick={onClose}
            className="block w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Get Lifetime Access - $1,499
          </Link>

          <p className="text-center text-slate-400 text-xs mt-4">
            One-time payment. No recurring fees. Cancel-proof.
          </p>

          {/* Skip link */}
          <button
            onClick={onClose}
            className="block w-full text-center text-slate-400 hover:text-slate-600 text-sm mt-4"
          >
            No thanks, I&apos;ll pay monthly
          </button>
        </div>

        {/* Urgency bar */}
        <div className="bg-red-50 border-t border-red-100 px-8 py-3 text-center">
          <span className="text-red-600 text-sm font-medium">
            Once all 10 spots are claimed, this deal is gone forever
          </span>
        </div>
      </div>
    </div>
  );
}
