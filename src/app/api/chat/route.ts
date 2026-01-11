import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/admin";
import { checkRateLimit, getClientIP, rateLimitConfigs, rateLimitResponse } from "@/lib/rate-limit";

interface ContractorPricing {
  sealcoating_enabled: boolean;
  sealcoating_price_per_sqft: number;
  crack_filling_enabled: boolean;
  crack_filling_price_per_linear_ft: number;
  paving_enabled: boolean;
  paving_price_per_sqft: number;
  line_striping_enabled: boolean;
  line_striping_price_per_stall: number;
}

function buildSystemPrompt(
  businessName: string,
  pricing: ContractorPricing | null
): string {
  const services: string[] = [];

  if (pricing) {
    if (pricing.sealcoating_enabled) {
      services.push(
        `- Sealcoating: $${pricing.sealcoating_price_per_sqft.toFixed(2)} per sq ft`
      );
    }
    if (pricing.crack_filling_enabled) {
      services.push(
        `- Crack Filling: $${pricing.crack_filling_price_per_linear_ft.toFixed(2)} per linear ft`
      );
    }
    if (pricing.paving_enabled) {
      services.push(
        `- Paving: $${pricing.paving_price_per_sqft.toFixed(2)} per sq ft`
      );
    }
    if (pricing.line_striping_enabled) {
      services.push(
        `- Line Striping: $${pricing.line_striping_price_per_stall.toFixed(2)} per stall`
      );
    }
  }

  const servicesText =
    services.length > 0
      ? `Current services and approximate prices:\n${services.join("\n")}`
      : `Services include sealcoating, crack filling, paving, and line striping. Pricing will be provided based on the specific job requirements.`;

  return `You are a helpful AI assistant for ${businessName}. Your job is to:
1. Greet the customer and ask for their property address
2. Once you have the address, confirm it and let them know you're checking the satellite view
3. Ask what service they need (e.g., sealcoating, crack filling, paving)
4. Based on the service and property details, provide an estimated quote
5. Collect their contact information (name, phone, email) to send the full quote

Be friendly, professional, and concise. Keep responses under 100 words.
If the customer asks about pricing, explain that quotes are based on square footage and you'll provide an estimate once you have the address.

${servicesText}

Always be helpful and guide the conversation toward getting their address and contact info.`;
}

function getAnthropic() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not configured");
  return new Anthropic({ apiKey });
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(`chat:${clientIP}`, rateLimitConfigs.chat);
    if (!rateLimit.success) {
      return rateLimitResponse(rateLimit.resetIn);
    }

    const { apiKey, messages } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 400 });
    }

    const supabase = createClient();

    // Validate the API key against the contractors table
    const { data: contractor, error: contractorError } = await supabase
      .from("contractors")
      .select("id, business_name, subscription_status, trial_ends_at")
      .eq("widget_api_key", apiKey)
      .single();

    if (contractorError || !contractor) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    // Check subscription status
    const now = new Date();
    const trialEnds = contractor.trial_ends_at
      ? new Date(contractor.trial_ends_at)
      : null;
    const isTrialValid = trialEnds && trialEnds > now;
    const isSubscriptionActive = contractor.subscription_status === "active";

    if (!isTrialValid && !isSubscriptionActive) {
      return NextResponse.json(
        { error: "Subscription expired. Please upgrade to continue." },
        { status: 403 }
      );
    }

    // Get contractor pricing
    const { data: pricing } = await supabase
      .from("contractor_asphalt_pricing")
      .select("*")
      .eq("contractor_id", contractor.id)
      .single();

    // Build dynamic system prompt with contractor's business name and pricing
    const systemPrompt = buildSystemPrompt(
      contractor.business_name,
      pricing as ContractorPricing | null
    );

    const anthropic = getAnthropic();

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const assistantMessage =
      response.content[0].type === "text"
        ? response.content[0].text
        : "I'm sorry, I couldn't process that request.";

    // Increment conversation count for this contractor
    await supabase
      .from("contractors")
      .update({
        conversations_this_month: (contractor as { conversations_this_month?: number }).conversations_this_month
          ? (contractor as { conversations_this_month?: number }).conversations_this_month! + 1
          : 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", contractor.id);

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
