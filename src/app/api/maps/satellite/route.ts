import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { latitude, longitude, zoom = 19 } = await request.json();

    if (!latitude || !longitude) {
      return NextResponse.json({ error: "Coordinates required" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Maps API not configured" }, { status: 500 });
    }

    // Generate satellite image URL
    const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=640x640&maptype=satellite&key=${apiKey}`;

    return NextResponse.json({
      imageUrl,
      latitude,
      longitude,
      zoom,
    });
  } catch (error) {
    console.error("Satellite API error:", error);
    return NextResponse.json({ error: "Failed to get satellite image" }, { status: 500 });
  }
}
