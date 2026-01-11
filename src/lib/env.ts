/**
 * Environment variable validation utility
 *
 * This module provides runtime validation for required environment variables.
 * Call validateEnv() at application startup to catch missing configuration early.
 */

interface EnvVarConfig {
  name: string;
  required: boolean;
  description: string;
}

// Define all expected environment variables
const ENV_VARS: EnvVarConfig[] = [
  // Supabase
  { name: "NEXT_PUBLIC_SUPABASE_URL", required: true, description: "Supabase project URL" },
  { name: "NEXT_PUBLIC_SUPABASE_ANON_KEY", required: true, description: "Supabase anonymous key" },
  { name: "SUPABASE_SERVICE_ROLE_KEY", required: true, description: "Supabase service role key" },

  // Anthropic
  { name: "ANTHROPIC_API_KEY", required: true, description: "Anthropic API key for AI chat" },

  // Google Maps (optional for satellite features)
  { name: "GOOGLE_MAPS_API_KEY", required: false, description: "Google Maps API key for satellite imagery" },
  { name: "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY", required: false, description: "Public Google Maps API key" },

  // Twilio (optional for SMS features)
  { name: "TWILIO_ACCOUNT_SID", required: false, description: "Twilio account SID" },
  { name: "TWILIO_AUTH_TOKEN", required: false, description: "Twilio auth token" },
  { name: "TWILIO_PHONE_NUMBER", required: false, description: "Twilio phone number" },

  // Stripe (optional for payments)
  { name: "STRIPE_SECRET_KEY", required: false, description: "Stripe secret key" },
  { name: "STRIPE_WEBHOOK_SECRET", required: false, description: "Stripe webhook secret" },

  // Email (optional)
  { name: "RESEND_API_KEY", required: false, description: "Resend API key for emails" },

  // App configuration
  { name: "NEXT_PUBLIC_SITE_URL", required: false, description: "Public site URL" },
  { name: "NEXT_PUBLIC_APP_URL", required: false, description: "Public app URL" },
];

interface ValidationResult {
  valid: boolean;
  missing: string[];
  warnings: string[];
}

/**
 * Validate that all required environment variables are set
 * @returns ValidationResult with missing required vars and warnings for optional ones
 */
export function validateEnv(): ValidationResult {
  const missing: string[] = [];
  const warnings: string[] = [];

  for (const envVar of ENV_VARS) {
    const value = process.env[envVar.name];

    if (!value || value.trim() === "") {
      if (envVar.required) {
        missing.push(`${envVar.name} - ${envVar.description}`);
      } else {
        warnings.push(`${envVar.name} - ${envVar.description} (optional)`);
      }
    }
  }

  return {
    valid: missing.length === 0,
    missing,
    warnings,
  };
}

/**
 * Validate environment variables and throw if required ones are missing
 * Call this at application startup
 */
export function assertEnv(): void {
  const result = validateEnv();

  if (!result.valid) {
    console.error("Missing required environment variables:");
    result.missing.forEach((msg) => console.error(`  - ${msg}`));
    throw new Error(
      `Missing required environment variables: ${result.missing.map((m) => m.split(" - ")[0]).join(", ")}`
    );
  }

  if (result.warnings.length > 0 && process.env.NODE_ENV === "development") {
    console.warn("Missing optional environment variables (some features may be disabled):");
    result.warnings.forEach((msg) => console.warn(`  - ${msg}`));
  }
}

/**
 * Get an environment variable with type safety
 * Throws if the variable is required but not set
 */
export function getEnv(name: string, required = true): string {
  const value = process.env[name];

  if (!value && required) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value || "";
}

/**
 * Check if an optional feature is configured
 */
export function isFeatureConfigured(feature: "sms" | "payments" | "maps" | "email"): boolean {
  switch (feature) {
    case "sms":
      return Boolean(
        process.env.TWILIO_ACCOUNT_SID &&
        process.env.TWILIO_AUTH_TOKEN &&
        process.env.TWILIO_PHONE_NUMBER
      );
    case "payments":
      return Boolean(
        process.env.STRIPE_SECRET_KEY &&
        process.env.STRIPE_WEBHOOK_SECRET
      );
    case "maps":
      return Boolean(process.env.GOOGLE_MAPS_API_KEY);
    case "email":
      return Boolean(process.env.RESEND_API_KEY);
    default:
      return false;
  }
}
