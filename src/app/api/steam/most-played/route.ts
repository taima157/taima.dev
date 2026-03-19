import { getSteamMostPlayed } from "@/lib/steam";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const steamMostPlayed = await getSteamMostPlayed();

    return NextResponse.json(steamMostPlayed);
  } catch (error) {
    console.error("[Steam] GET:", error);

    return NextResponse.json(
      { error: "Error fetching Steam data" },
      { status: 500 },
    );
  }
}
