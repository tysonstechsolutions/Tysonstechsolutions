import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { createClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const { to, body, contractorId, leadId } = await request.json();

    // Validate required fields
    if (!to || !body) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate phone number format (basic E.164 check)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(to.replace(/[\s\-\(\)]/g, ""))) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 });
    }

    // Validate body length
    if (body.length > 1600) {
      return NextResponse.json({ error: "Message too long (max 1600 characters)" }, { status: 400 });
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
    if (contractorId) {
      const supabase = createClient();
      await supabase.from("sms_log").insert({
        lead_id: leadId || null,
        contractor_id: contractorId,
        direction: "outbound",
        from_number: fromNumber,
        to_number: to,
        body: body,
        twilio_sid: message.sid,
      });
    }

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
