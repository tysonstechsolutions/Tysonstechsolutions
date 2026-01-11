import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const from = formData.get("From")?.toString() || "";
    const to = formData.get("To")?.toString() || "";
    const body = formData.get("Body")?.toString() || "";
    const messageSid = formData.get("MessageSid")?.toString() || "";

    console.log("Incoming SMS:", { from, to, body, messageSid });

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
      console.error("Error logging SMS:", logError);
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
    console.error("SMS webhook error:", error);
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      {
        headers: { "Content-Type": "text/xml" },
        status: 500,
      }
    );
  }
}
