import { getCurrentTrack } from "@/lib/spotify";
import { Artist, SpotifyCurrentTrackResponse } from "@/types/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const currentTrack = await getCurrentTrack();

    if (!currentTrack) {
      return NextResponse.json({
        online: false,
      });
    }

    const item = currentTrack.item;

    return NextResponse.json({
      online: true,
      isPlaying: currentTrack.is_playing,
      title: item?.name,
      artist: item?.artists.map((a: Artist) => a.name).join(" | "),
      album: item?.album.name,
      image: item?.album.images[0],
      url: item?.external_urls.spotify,
    } as SpotifyCurrentTrackResponse);
  } catch (error) {
    console.error("Error fetching Spotify data:", error);

    return NextResponse.json(
      { error: "Erro ao buscar dados do Spotify" },
      { status: 500 },
    );
  }
}
