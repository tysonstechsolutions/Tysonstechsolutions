import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are a helpful AI assistant for a service contractor. Your job is to:
1. Greet the customer and ask for their property address
2. Once you have the address, confirm it and let them know you're checking the satellite view
3. Ask what service they need (e.g., sealcoating, lawn care, painting)
4. Based on the service and property details, provide an estimated quote
5. Collect their contact information (name, phone, email) to send the full quote

Be friendly, professional, and concise. Keep responses under 100 words.
If the customer asks about pricing, explain that quotes are based on square footage and you'll provide an estimate once you have the address.

Current services and approximate prices (use as rough estimates):
- Sealcoating: $0.15 per sq ft
- Crack Filling: $0.25 per sq ft
- Lawn Mowing: $0.05 per sq ft
- Exterior Painting: $2.50 per sq ft

Always be helpful and guide the conversation toward getting their address and contact info.`;

function getAnthropic() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not configured");
  return new Anthropic({ apiKey });
}

export async function POST(request: NextRequest) {
  try {
    const { apiKey, messages } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 400 });
    }

    const anthropic = getAnthropic();

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const assistantMessage = response.content[0].type === "text" 
      ? response.content[0].text 
      : "I'm sorry, I couldn't process that request.";

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
