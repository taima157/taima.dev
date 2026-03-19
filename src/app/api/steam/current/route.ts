import { getSteamCurrentStatus } from "@/lib/steam";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getSteamCurrentStatus();

    if (!data) {
      return NextResponse.json(
        { error: "No Steam data found" },
        { status: 404 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("[Steam] GET:", error);

    return NextResponse.json(
      { error: "Error fetching Steam data" },
      { status: 500 },
    );
  }
}
