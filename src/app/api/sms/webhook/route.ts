import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const from = formData.get("From") as string;
    const to = formData.get("To") as string;
    const body = formData.get("Body") as string;
    const messageSid = formData.get("MessageSid") as string;

    console.log("Incoming SMS:", { from, to, body, messageSid });

    // TODO: Process incoming SMS
    // - Look up contractor by phone number
    // - Match to existing lead conversation
    // - Store message in database
    // - Potentially trigger AI response

    // Return TwiML response
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
