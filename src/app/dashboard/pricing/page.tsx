"use client";

import { useState } from "react";

const serviceTypes = [
  { id: "sealcoating", name: "Sealcoating", defaultPrice: 0.15 },
  { id: "crack_filling", name: "Crack Filling", defaultPrice: 0.25 },
  { id: "line_striping", name: "Line Striping", defaultPrice: 0.10 },
  { id: "lawn_mowing", name: "Lawn Mowing", defaultPrice: 0.05 },
  { id: "lawn_fertilizing", name: "Lawn Fertilizing", defaultPrice: 0.08 },
  { id: "exterior_painting", name: "Exterior Painting", defaultPrice: 2.50 },
  { id: "interior_painting", name: "Interior Painting", defaultPrice: 2.00 },
];

export default function PricingPage() {
  const [services, setServices] = useState(
    serviceTypes.map(s => ({ ...s, price: s.defaultPrice, enabled: false, minimum: 100 }))
  );

  const handlePriceChange = (id: string, price: number) => {
    setServices(services.map(s => s.id === id ? { ...s, price } : s));
  };

  const handleToggle = (id: string) => {
    setServices(services.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const handleMinimumChange = (id: string, minimum: number) => {
    setServices(services.map(s => s.id === id ? { ...s, minimum } : s));
  };

  const handleSave = async () => {
    alert("Pricing saved! (Database integration pending)");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Service Pricing</h1>
        <p className="text-slate-600 mt-1">Configure your pricing for automatic quotes</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Your Services</h2>
          <p className="text-sm text-slate-500 mt-1">Enable the services you offer and set your price per square foot</p>
        </div>
        
        <div className="divide-y divide-slate-200">
          {services.map((service) => (
            <div key={service.id} className="p-6 flex items-center justify-between">
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer mr-4">
                  <input
                    type="checkbox"
                    checked={service.enabled}
                    onChange={() => handleToggle(service.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <div>
                  <div className="font-medium text-slate-900">{service.name}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Price / sq ft</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={service.price}
                      onChange={(e) => handlePriceChange(service.id, parseFloat(e.target.value) || 0)}
                      disabled={!service.enabled}
                      className="w-24 pl-7 pr-3 py-2 rounded-lg border border-slate-300 text-sm disabled:bg-slate-50 disabled:text-slate-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Minimum</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <input
                      type="number"
                      step="1"
                      min="0"
                      value={service.minimum}
                      onChange={(e) => handleMinimumChange(service.id, parseInt(e.target.value) || 0)}
                      disabled={!service.enabled}
                      className="w-24 pl-7 pr-3 py-2 rounded-lg border border-slate-300 text-sm disabled:bg-slate-50 disabled:text-slate-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-200">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Save Pricing
          </button>
        </div>
      </div>
    </div>
  );
}
