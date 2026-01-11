import { NextRequest, NextResponse } from "next/server";

interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  limit: number; // Max requests per window
}

// In-memory store for rate limiting (use Redis in production for multi-instance)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 60000); // Clean every minute

export function getClientIP(request: NextRequest): string {
  // Try various headers for the real IP (in order of reliability)
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  // Cloudflare specific header
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Vercel specific header
  const vercelForwardedFor = request.headers.get("x-vercel-forwarded-for");
  if (vercelForwardedFor) {
    return vercelForwardedFor.split(",")[0].trim();
  }

  // Fallback - generate unique identifier from request characteristics
  // This prevents all unknown IPs from sharing the same rate limit
  const userAgent = request.headers.get("user-agent") || "";
  const acceptLanguage = request.headers.get("accept-language") || "";
  const fallbackId = `unknown-${Buffer.from(userAgent + acceptLanguage).toString("base64").slice(0, 16)}`;

  return fallbackId;
}

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): { success: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const key = identifier;
  const record = rateLimitStore.get(key);

  if (!record || record.resetTime < now) {
    // Create new window
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.interval,
    });
    return {
      success: true,
      remaining: config.limit - 1,
      resetIn: config.interval,
    };
  }

  if (record.count >= config.limit) {
    return {
      success: false,
      remaining: 0,
      resetIn: record.resetTime - now,
    };
  }

  // Increment count
  record.count += 1;
  rateLimitStore.set(key, record);

  return {
    success: true,
    remaining: config.limit - record.count,
    resetIn: record.resetTime - now,
  };
}

export function rateLimitResponse(resetIn: number): NextResponse {
  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    {
      status: 429,
      headers: {
        "Retry-After": String(Math.ceil(resetIn / 1000)),
        "X-RateLimit-Reset": String(Math.ceil(Date.now() / 1000 + resetIn / 1000)),
      },
    }
  );
}

// Pre-configured rate limiters for different endpoints
export const rateLimitConfigs = {
  // Chat API: 30 requests per minute
  chat: { interval: 60000, limit: 30 },
  // SMS: 10 messages per minute
  sms: { interval: 60000, limit: 10 },
  // Auth: 5 attempts per 15 minutes
  auth: { interval: 900000, limit: 5 },
  // General API: 100 requests per minute
  api: { interval: 60000, limit: 100 },
  // Maps: 50 requests per minute
  maps: { interval: 60000, limit: 50 },
};
