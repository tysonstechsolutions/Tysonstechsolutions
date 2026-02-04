import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/admin";
import { sendEmail, emailTemplates } from "@/lib/email";
import { checkRateLimit, getClientIP, rateLimitConfigs, rateLimitResponse } from "@/lib/rate-limit";

// Sanitize user input to prevent XSS and injection attacks
function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "") // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .trim()
    .slice(0, 5000); // Limit length
}

// Sanitize object values recursively
function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj };
  for (const key in sanitized) {
    if (typeof sanitized[key] === "string") {
      (sanitized as Record<string, unknown>)[key] = sanitizeInput(sanitized[key] as string);
    }
  }
  return sanitized;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(`contact:${clientIP}`, rateLimitConfigs.form);
    if (!rateLimit.success) {
      return rateLimitResponse(rateLimit.resetIn);
    }

    const rawData = await request.json();
    const data = sanitizeObject(rawData);

    // Validate required fields
    const { name, email, message } = data;
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Basic spam check
    if (message.length > 5000) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }

    const supabase = createClient();

    // Insert contact submission
    const { error: insertError } = await supabase
      .from("contact_submissions")
      .insert({
        name,
        email,
        phone: data.phone || null,
        company_name: data.company_name || null,
        subject: data.subject || null,
        message,
        source_page: data.source_page || null,
        status: "new",
      });

    if (insertError) {
      console.error("Error inserting contact:", insertError);
      return NextResponse.json({ error: "Failed to submit message" }, { status: 500 });
    }

    // Send notification emails
    try {
      // Notify admin
      const adminEmail = emailTemplates.newContactAdmin({
        name,
        email,
        subject: data.subject,
        message,
      });
      await sendEmail(adminEmail);

      // Send confirmation to customer
      const customerEmail = emailTemplates.contactConfirmation({
        name,
        email,
      });
      await sendEmail(customerEmail);
    } catch (emailError) {
      console.error("Failed to send contact notification:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! We'll respond within 24 hours.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 });
  }
}
