import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/admin";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { sendEmail, emailTemplates } from "@/lib/email";

// Sanitize user input to prevent XSS and injection attacks
function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim()
    .slice(0, 5000);
}

// Sanitize object values
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
    const rawData = await request.json();
    const data = sanitizeObject(rawData);

    // Validate required fields
    const { name, email, service_slug, service_name } = data;
    if (!name || !email || !service_slug || !service_name) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, service_slug, service_name" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const supabase = createClient();

    // Insert inquiry into database
    const { data: inquiry, error: insertError } = await supabase
      .from("service_inquiries")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company_name: data.company_name || null,
        website_url: data.website_url || null,
        service_slug: data.service_slug,
        service_name: data.service_name,
        package_tier: data.package_tier || null,
        budget: data.budget || null,
        timeline: data.timeline || null,
        project_description: data.project_description || null,
        source_page: data.source_page || null,
        utm_source: data.utm_source || null,
        utm_medium: data.utm_medium || null,
        utm_campaign: data.utm_campaign || null,
        status: "new",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting inquiry:", insertError);
      return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
    }

    // Send notification emails
    try {
      // Notify admin
      const adminEmail = emailTemplates.newInquiryAdmin({
        name: data.name,
        email: data.email,
        phone: data.phone,
        companyName: data.company_name,
        serviceName: service_name,
        budget: data.budget,
        timeline: data.timeline,
        description: data.project_description,
      });
      await sendEmail(adminEmail);

      // Send confirmation to customer
      const customerEmail = emailTemplates.inquiryConfirmation({
        name: data.name,
        email: data.email,
        serviceName: service_name,
      });
      await sendEmail(customerEmail);
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll be in touch within 24 hours.",
      inquiry_id: inquiry.id,
    });
  } catch (error) {
    console.error("Inquiry API error:", error);
    return NextResponse.json({ error: "Failed to process inquiry" }, { status: 500 });
  }
}

// GET endpoint to fetch inquiries (for admin dashboard - requires authentication)
export async function GET(request: NextRequest) {
  try {
    // Verify user is authenticated
    const serverSupabase = await createServerClient();
    const { data: { user }, error: authError } = await serverSupabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is an admin (you can customize this check based on your admin logic)
    // For now, we check if the user's email matches the admin email
    const adminEmail = process.env.ADMIN_EMAIL || "tyson@tysonstechsolutions.com";
    if (user.email !== adminEmail) {
      return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const service = searchParams.get("service");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100); // Cap at 100

    const supabase = createClient();

    let query = supabase
      .from("service_inquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (status) {
      query = query.eq("status", status);
    }
    if (service) {
      query = query.eq("service_slug", service);
    }

    const { data: inquiries, error } = await query;

    if (error) {
      console.error("Error fetching inquiries:", error);
      return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
    }

    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error("Inquiry GET error:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}
