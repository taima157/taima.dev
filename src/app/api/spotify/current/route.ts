import { getSpotifyCurrentStatus } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getSpotifyCurrentStatus();

    return NextResponse.json(data);
  } catch (error) {
    console.error("[Spotify] GET:", error);

    return NextResponse.json(
      { error: "Error fetching Spotify data" },
      { status: 500 },
    );
  }
}
