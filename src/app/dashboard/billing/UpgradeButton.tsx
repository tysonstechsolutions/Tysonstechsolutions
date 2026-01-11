"use client";

import { useState } from "react";

interface UpgradeButtonProps {
  priceId: string;
  contractorId: string;
  planName: string;
  recommended?: boolean;
}

export default function UpgradeButton({
  priceId,
  contractorId,
  planName,
  recommended,
}: UpgradeButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    if (!priceId || !contractorId) {
      alert("Unable to process upgrade. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, contractorId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to start checkout");
        setLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please try again.");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className={`w-full py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
        recommended
          ? "bg-orange-500 text-white hover:bg-orange-600"
          : "border border-slate-300 text-slate-700 hover:bg-slate-50"
      }`}
    >
      {loading ? "Loading..." : `Upgrade to ${planName}`}
    </button>
  );
}
