import {
  getSteamGameDetail,
  getSteamGameIcon,
  getSteamSummary,
} from "@/lib/steam";
import { SteamCurrentStatus, SteamUserSummary } from "@/types/steam";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const steamSummary = await getSteamSummary();

    if (steamSummary) {
      const userData = {
        personaname: steamSummary.personaname,
        profileurl: steamSummary.profileurl,
        avatarfull: steamSummary.avatarfull,
      } as SteamUserSummary;

      if (steamSummary.gameid) {
        const gameDetail = await getSteamGameDetail(steamSummary.gameid);
        const gameIcon = await getSteamGameIcon(steamSummary.gameid);

        return NextResponse.json({
          isPlaying: true,
          user: userData,
          game: {
            name: gameDetail?.name,
            publishers: gameDetail?.publishers,
            icon: gameIcon?.thumb,
          },
        } as SteamCurrentStatus);
      }

      return NextResponse.json({
        isPlaying: false,
        user: userData,
      } as SteamCurrentStatus);
    }

    throw new Error("No Steam summary found");
  } catch (error) {
    console.error("Error fetching Steam data:", error);

    return NextResponse.json(
      { error: "Error fetching Steam data" },
      { status: 500 },
    );
  }
}
