"use client";

import Link from "next/link";
import { servicePackages } from "@/data/service-packages";

interface ServicePackagesProps {
  serviceSlug: string;
  serviceName: string;
}

export default function ServicePackages({ serviceSlug, serviceName }: ServicePackagesProps) {
  const packages = servicePackages[serviceSlug as keyof typeof servicePackages];

  if (!packages) {
    return null;
  }

  const formatPrice = (price: number, priceType: string) => {
    if (priceType === "monthly") {
      return (
        <>
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-slate-500">/month</span>
        </>
      );
    }
    return (
      <>
        <span className="text-4xl font-bold">${price.toLocaleString()}</span>
        <span className="text-slate-500"> one-time</span>
      </>
    );
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {serviceName} Packages
          </h2>
          <p className="text-xl text-slate-600">
            Transparent pricing with no hidden fees. Choose the package that fits your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.packages.map((pkg) => (
            <div
              key={pkg.tier}
              className={`relative bg-white rounded-2xl border-2 p-8 ${
                pkg.isPopular
                  ? "border-orange-500 shadow-xl"
                  : "border-slate-200"
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {pkg.name}
                </h3>
                <p className="text-slate-600 text-sm mb-4">{pkg.description}</p>
                <div className="text-slate-900">
                  {formatPrice(pkg.price, pkg.priceType)}
                </div>
                {pkg.timelineDays && pkg.timelineDays > 1 && (
                  <p className="text-sm text-slate-500 mt-2">
                    ~{pkg.timelineDays} day delivery
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-slate-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {"deliverables" in pkg && pkg.deliverables && (
                <div className="mb-6 pt-4 border-t border-slate-200">
                  <p className="text-xs font-medium text-slate-500 uppercase mb-2">
                    Deliverables
                  </p>
                  <ul className="space-y-1">
                    {(pkg.deliverables as string[]).map((item, i) => (
                      <li key={i} className="text-sm text-slate-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link
                href={`#quote`}
                className={`block w-full text-center py-3 rounded-lg font-medium transition-colors ${
                  pkg.isPopular
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-500 mt-8">
          Need something custom? <a href="#quote" className="text-orange-500 hover:text-orange-600 font-medium">Contact us</a> for a tailored quote.
        </p>
      </div>
    </section>
  );
}
