import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIP, rateLimitConfigs, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(`maps:${clientIP}`, rateLimitConfigs.maps);
    if (!rateLimit.success) {
      return rateLimitResponse(rateLimit.resetIn);
    }

    const { latitude, longitude, zoom = 19 } = await request.json();

    // Validate required fields
    if (latitude === undefined || longitude === undefined) {
      return NextResponse.json({ error: "Coordinates required" }, { status: 400 });
    }

    // Validate coordinate ranges
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
    }

    // Validate zoom level (Google Maps supports 0-21)
    const zoomLevel = Math.min(Math.max(parseInt(zoom) || 19, 0), 21);

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Maps API not configured" }, { status: 500 });
    }

    // Fetch the image from Google Maps (proxy to hide API key)
    const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoomLevel}&size=640x640&maptype=satellite&key=${apiKey}`;

    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      console.error("Google Maps API error:", imageResponse.status);
      return NextResponse.json({ error: "Failed to fetch satellite image" }, { status: 502 });
    }

    const imageBuffer = await imageResponse.arrayBuffer();

    // Return the image directly (proxied, API key hidden)
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error("Satellite API error:", error);
    return NextResponse.json({ error: "Failed to get satellite image" }, { status: 500 });
  }
}
