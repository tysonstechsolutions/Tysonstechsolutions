import { Metadata } from "next";
import CalendlyEmbed from "@/components/booking/CalendlyEmbed";

export const metadata: Metadata = {
  title: "Book a Free Consultation | TysonsTechSolutions",
  description:
    "Schedule a free 30-minute consultation to discuss your project. No obligation, just expert advice on how technology can grow your business.",
};

// Configure your Calendly URL here
const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/tysonstechsolutions/consultation";

export default function BookConsultationPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Book Your Free Consultation
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Schedule a 30-minute call with our team. We&apos;ll discuss your
            project, answer your questions, and provide expert recommendations
            - no strings attached.
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Benefits */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                What to Expect
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      30 Minutes
                    </h3>
                    <p className="text-sm text-slate-600">
                      Quick but comprehensive discussion of your needs
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">No Pressure</h3>
                    <p className="text-sm text-slate-600">
                      Get honest advice with zero sales pressure
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Expert Insights
                    </h3>
                    <p className="text-sm text-slate-600">
                      Get actionable recommendations for your project
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Free Estimate
                    </h3>
                    <p className="text-sm text-slate-600">
                      Get a rough budget range for your project
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 mt-8">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Come Prepared With:
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">-</span>
                    Your project goals and timeline
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">-</span>
                    Any existing materials (wireframes, designs)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">-</span>
                    Budget expectations (if any)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">-</span>
                    Questions about our services
                  </li>
                </ul>
              </div>
            </div>

            {/* Calendly Embed */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <CalendlyEmbed
                  url={CALENDLY_URL}
                  styles={{ height: "700px", minWidth: "320px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="py-12 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Prefer Another Way to Connect?
          </h2>
          <p className="text-slate-600 mb-6">
            Not ready for a call? No problem. Reach out however works best for
            you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@tysonstechsolutions.com"
              className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-lg hover:border-orange-300 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email Us
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Contact Form
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
