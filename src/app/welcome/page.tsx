"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function WelcomeContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "starter";
  const success = searchParams.get("success") === "true";

  const planNames: Record<string, string> = {
    starter: "Starter",
    growth: "Growth",
    pro: "Pro",
    lifetime: "Lifetime Pro",
  };

  if (!success) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
          <p className="text-slate-400 mb-6">
            Your payment may not have completed. Please try again or contact support.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Back to Pricing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to TysonsTechSolutions!
        </h1>

        <p className="text-xl text-slate-300 mb-2">
          You&apos;re now on the <span className="text-orange-400 font-semibold">{planNames[plan]}</span> plan.
        </p>

        <p className="text-slate-400 mb-8">
          Check your email for a receipt and next steps. We&apos;ll be in touch within 24 hours to get you set up.
        </p>

        {/* What happens next */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8 text-left">
          <h2 className="text-lg font-semibold text-white mb-4">What happens next?</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</span>
              <span>You&apos;ll receive a welcome email with your account details</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</span>
              <span>We&apos;ll schedule a quick onboarding call to understand your business</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</span>
              <span>Your AI chatbot will be configured and ready within 48 hours</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Back to Home
          </Link>
          <Link
            href="/demo"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            See Demo Chatbots
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <WelcomeContent />
    </Suspense>
  );
}
