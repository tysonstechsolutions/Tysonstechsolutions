"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface DealStatus {
  active: boolean;
  spotsRemaining: number;
  totalSpots: number;
}

interface PromoStatus {
  active: boolean;
  totalSpotsRemaining: number;
  deals: {
    growth: DealStatus;
    pro: DealStatus;
    lifetime: DealStatus;
  };
}

export default function PromoBanner() {
  const [promo, setPromo] = useState<PromoStatus | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if banner was dismissed this session
    const wasDismissed = sessionStorage.getItem("promo-banner-dismissed");
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    fetch("/api/promo/founding")
      .then((res) => res.json())
      .then((data) => setPromo(data))
      .catch(() => null);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("promo-banner-dismissed", "true");
    setDismissed(true);
  };

  if (dismissed || !promo?.active) {
    return null;
  }

  // Show lifetime deal if available, otherwise show the free month deals
  const showLifetime = promo.deals.lifetime.active;
  const freeMonthSpotsLeft = promo.deals.growth.spotsRemaining + promo.deals.pro.spotsRemaining;

  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 px-4 text-center text-sm relative">
      <Link href="/pricing" className="hover:underline">
        {showLifetime ? (
          <>
            <span className="font-bold">Lifetime Pro Deal:</span>
            {" "}$1,499 one-time (only {promo.deals.lifetime.spotsRemaining} spots left!)
            {" "}<span className="underline">Claim yours →</span>
          </>
        ) : freeMonthSpotsLeft > 0 ? (
          <>
            <span className="font-bold">Founding Member Special:</span>
            {" "}Buy 1 month, get month 2 FREE!
            {" "}<span className="underline">See deals →</span>
          </>
        ) : null}
      </Link>
      <button
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-1"
        aria-label="Dismiss"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
