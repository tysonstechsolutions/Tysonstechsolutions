import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/admin";
import twilio from "twilio";
import { logger } from "@/lib/logger";

// Validate Twilio webhook signature
function validateTwilioSignature(request: NextRequest, params: Record<string, string>): boolean {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioSignature = request.headers.get("x-twilio-signature");

  if (!authToken || !twilioSignature) {
    logger.warn("Missing Twilio auth token or signature");
    return false;
  }

  // Get the full URL for signature validation
  const url = request.url;

  try {
    return twilio.validateRequest(authToken, twilioSignature, url, params);
  } catch (error) {
    logger.error("Twilio signature validation error", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Convert formData to object for signature validation
    const params: Record<string, string> = {};
    formData.forEach((value, key) => {
      params[key] = value.toString();
    });

    // Validate Twilio signature in production
    if (process.env.NODE_ENV === "production") {
      const isValid = validateTwilioSignature(request, params);
      if (!isValid) {
        logger.warn("Invalid Twilio signature - rejecting webhook");
        return new NextResponse("Forbidden", { status: 403 });
      }
    }

    const from = params["From"] || "";
    const to = params["To"] || "";
    const body = params["Body"] || "";
    const messageSid = params["MessageSid"] || "";

    logger.debug("Incoming SMS", { from, to, bodyPreview: body.slice(0, 50), messageSid });

    if (!from || !body) {
      return new NextResponse(
        '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
        { headers: { "Content-Type": "text/xml" } }
      );
    }

    const supabase = createClient();

    // Look up the contractor by their Twilio phone number (the "to" number)
    const { data: contractor } = await supabase
      .from("contractors")
      .select("id")
      .eq("phone", to)
      .single();

    // Find the most recent lead from this phone number for this contractor
    let leadId: string | null = null;
    let contractorId: string | null = contractor?.id || null;

    if (contractorId) {
      const { data: lead } = await supabase
        .from("leads")
        .select("id, contractor_id")
        .eq("customer_phone", from)
        .eq("contractor_id", contractorId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (lead) {
        leadId = lead.id;
      }
    } else {
      // If no contractor found by phone, try to find any lead with this customer phone
      const { data: lead } = await supabase
        .from("leads")
        .select("id, contractor_id")
        .eq("customer_phone", from)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (lead) {
        leadId = lead.id;
        contractorId = lead.contractor_id;
      }
    }

    // Log the incoming SMS to the database
    const { error: logError } = await supabase.from("sms_log").insert({
      lead_id: leadId,
      contractor_id: contractorId,
      direction: "inbound",
      from_number: from,
      to_number: to,
      body: body,
      twilio_sid: messageSid,
    });

    if (logError) {
      logger.error("Error logging SMS", logError);
    }

    // Update lead status if we found one and it's still "new"
    if (leadId) {
      await supabase
        .from("leads")
        .update({ status: "contacted", updated_at: new Date().toISOString() })
        .eq("id", leadId)
        .eq("status", "new");
    }

    // Return empty TwiML response (no auto-reply for now)
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      {
        headers: { "Content-Type": "text/xml" },
      }
    );
  } catch (error) {
    logger.error("SMS webhook error", error);
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      {
        headers: { "Content-Type": "text/xml" },
        status: 500,
      }
    );
  }
}
