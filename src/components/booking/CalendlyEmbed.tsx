"use client";

import { useEffect } from "react";

interface CalendlyEmbedProps {
  url: string;
  styles?: {
    height?: string;
    minWidth?: string;
  };
  prefill?: {
    name?: string;
    email?: string;
    customAnswers?: Record<string, string>;
  };
  utm?: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  };
}

export default function CalendlyEmbed({
  url,
  styles = { height: "700px", minWidth: "320px" },
  prefill,
  utm,
}: CalendlyEmbedProps) {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Build the URL with prefill and UTM parameters
  const buildUrl = () => {
    const params = new URLSearchParams();

    if (prefill?.name) params.append("name", prefill.name);
    if (prefill?.email) params.append("email", prefill.email);
    if (prefill?.customAnswers) {
      Object.entries(prefill.customAnswers).forEach(([key, value]) => {
        params.append(key, value);
      });
    }

    if (utm?.utmSource) params.append("utm_source", utm.utmSource);
    if (utm?.utmMedium) params.append("utm_medium", utm.utmMedium);
    if (utm?.utmCampaign) params.append("utm_campaign", utm.utmCampaign);

    const queryString = params.toString();
    return queryString ? `${url}?${queryString}` : url;
  };

  return (
    <div
      className="calendly-inline-widget"
      data-url={buildUrl()}
      style={{
        minWidth: styles.minWidth,
        height: styles.height,
      }}
    />
  );
}
