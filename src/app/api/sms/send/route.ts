import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { createClient } from "@/lib/supabase/admin";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { checkRateLimit, getClientIP, rateLimitConfigs, rateLimitResponse } from "@/lib/rate-limit";

const SMS_MAX_LENGTH = 1600;
const PHONE_MIN_DIGITS = 10;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(`sms:${clientIP}`, rateLimitConfigs.sms);
    if (!rateLimit.success) {
      return rateLimitResponse(rateLimit.resetIn);
    }

    // Verify user is authenticated
    const serverSupabase = await createServerClient();
    const { data: { user }, error: authError } = await serverSupabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { to, body, contractorId, leadId } = await request.json();

    // Validate required fields
    if (!to || !body || !contractorId) {
      return NextResponse.json({ error: "Missing required fields: to, body, contractorId" }, { status: 400 });
    }

    // Verify the user owns this contractor account
    const supabase = createClient();
    const { data: contractor, error: contractorError } = await supabase
      .from("contractors")
      .select("id, subscription_tier")
      .eq("id", contractorId)
      .eq("auth_user_id", user.id)
      .single();

    if (contractorError || !contractor) {
      return NextResponse.json({ error: "Forbidden - Not your contractor account" }, { status: 403 });
    }

    // Check if contractor has SMS feature (Growth or Pro tier)
    if (contractor.subscription_tier === "starter") {
      return NextResponse.json(
        { error: "SMS notifications require Growth or Pro plan" },
        { status: 403 }
      );
    }

    // Validate phone number format (basic E.164 check)
    const cleanedPhone = to.replace(/[\s\-\(\)]/g, "");
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(cleanedPhone) || cleanedPhone.replace(/\D/g, "").length < PHONE_MIN_DIGITS) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 });
    }

    // Validate body length
    if (body.length > SMS_MAX_LENGTH) {
      return NextResponse.json(
        { error: `Message too long (max ${SMS_MAX_LENGTH} characters)` },
        { status: 400 }
      );
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
      return NextResponse.json({ error: "Twilio not configured" }, { status: 500 });
    }

    const client = twilio(accountSid, authToken);

    const message = await client.messages.create({
      body,
      from: fromNumber,
      to,
    });

    // Log the outbound SMS to the database
    await supabase.from("sms_log").insert({
      lead_id: leadId || null,
      contractor_id: contractorId,
      direction: "outbound",
      from_number: fromNumber,
      to_number: to,
      body: body,
      twilio_sid: message.sid,
    });

    return NextResponse.json({
      success: true,
      sid: message.sid,
      status: message.status,
    });
  } catch (error) {
    console.error("SMS send error:", error);
    return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 });
  }
}
