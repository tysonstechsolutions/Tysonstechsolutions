import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
            <span className="text-4xl">🔍</span>
          </div>
          <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-600 mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have
            been moved, deleted, or never existed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/services"
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View Services
          </Link>
        </div>

        <div className="border-t border-slate-200 pt-8">
          <p className="text-slate-500 text-sm mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/services"
              className="text-orange-500 hover:text-orange-600 text-sm font-medium"
            >
              Our Services
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/industries"
              className="text-orange-500 hover:text-orange-600 text-sm font-medium"
            >
              Industries
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/blog"
              className="text-orange-500 hover:text-orange-600 text-sm font-medium"
            >
              Blog
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/pricing"
              className="text-orange-500 hover:text-orange-600 text-sm font-medium"
            >
              Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
