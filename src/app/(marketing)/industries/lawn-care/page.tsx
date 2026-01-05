import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lawn Care Lead Generation - Coming Soon | TysonsTechSolutions",
  description: "AI-powered lead generation for lawn care companies. Coming soon. Join the waitlist.",
};

export default function LawnCarePage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <div className="text-6xl mb-6">🌿</div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Lawn Care Industry
        </h1>
        <p className="text-xl text-slate-600 mb-8">
          We are building AI-powered lead generation specifically for lawn care
          companies. Get instant quotes for mowing, fertilizing, and landscaping services.
        </p>
        <div className="inline-block px-6 py-3 bg-amber-100 text-amber-700 rounded-full font-medium mb-8">
          Coming Soon
        </div>
        <div className="space-y-4">
          <p className="text-slate-600">
            Want to be notified when we launch?
          </p>
          <Link
            href="/signup"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium"
          >
            Join the Waitlist
          </Link>
        </div>
      </div>
    </div>
  );
}
