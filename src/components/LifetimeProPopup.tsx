"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface LifetimeProPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LifetimeProPopup({ isOpen, onClose }: LifetimeProPopupProps) {
  const [countdown, setCountdown] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    if (!isOpen) return;

    // Get or set countdown end time
    let endTime = localStorage.getItem("lifetime_offer_ends");
    if (!endTime) {
      // Set 24 hour countdown from now
      const end = new Date();
      end.setHours(end.getHours() + 24);
      endTime = end.toISOString();
      localStorage.setItem("lifetime_offer_ends", endTime);
    }

    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date(endTime!);
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const lifetimePrice = 2999;
  const monthlyPrice = 499;
  const monthsValue = Math.ceil(lifetimePrice / monthlyPrice); // ~6 months

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

        {/* Countdown Timer */}
        <div className="bg-slate-900 py-4 px-8">
          <div className="text-center">
            <div className="text-xs text-slate-400 mb-2">OFFER EXPIRES IN</div>
            <div className="flex justify-center gap-3">
              <div className="bg-slate-800 rounded-lg px-3 py-2 min-w-[60px]">
                <div className="text-2xl font-bold text-white">{String(countdown.hours).padStart(2, '0')}</div>
                <div className="text-xs text-slate-400">HOURS</div>
              </div>
              <div className="text-2xl font-bold text-slate-500 self-center">:</div>
              <div className="bg-slate-800 rounded-lg px-3 py-2 min-w-[60px]">
                <div className="text-2xl font-bold text-white">{String(countdown.minutes).padStart(2, '0')}</div>
                <div className="text-xs text-slate-400">MINS</div>
              </div>
              <div className="text-2xl font-bold text-slate-500 self-center">:</div>
              <div className="bg-slate-800 rounded-lg px-3 py-2 min-w-[60px]">
                <div className="text-2xl font-bold text-white">{String(countdown.seconds).padStart(2, '0')}</div>
                <div className="text-xs text-slate-400">SECS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Price */}
          <div className="text-center mb-6">
            <div className="text-sm text-slate-500 mb-1">One-time payment</div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl text-slate-400 line-through">${monthlyPrice}/mo forever</span>
            </div>
            <div className="text-5xl font-bold text-slate-900">${lifetimePrice}</div>
            <div className="text-sm text-green-600 font-medium mt-1">
              That&apos;s just {monthsValue} months of Pro - then it&apos;s FREE forever
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
                "Priority Support",
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
            href="/signup?plan=pro&offer=lifetime"
            onClick={onClose}
            className="block w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Get Lifetime Access - ${lifetimePrice}
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
            This offer won&apos;t be available after the timer runs out
          </span>
        </div>
      </div>
    </div>
  );
}
