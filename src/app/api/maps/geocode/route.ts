import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Maps API not configured" }, { status: 500 });
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status !== "OK" || !data.results.length) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    const result = data.results[0];
    return NextResponse.json({
      formattedAddress: result.formatted_address,
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng,
      placeId: result.place_id,
    });
  } catch (error) {
    console.error("Geocode error:", error);
    return NextResponse.json({ error: "Failed to geocode address" }, { status: 500 });
  }
}
