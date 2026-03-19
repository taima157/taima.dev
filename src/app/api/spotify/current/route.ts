import { Artist, SpotifyCurrentTrackResponse } from "@/types/spotify";
import { getAccessToken, getCurrentlyPlaying } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    const currentTrack = await getCurrentlyPlaying(accessToken);

    if (!currentTrack) {
      return NextResponse.json({
        online: false,
      });
    }

    return NextResponse.json({
      online: true,
      isPlaying: currentTrack.is_playing,
      title: currentTrack.item?.name,
      artist: currentTrack.item?.artists.map((a: Artist) => a.name).join(" | "),
      album: currentTrack.item?.album.name,
      image: currentTrack.item?.album.images[0],
      url: currentTrack.item?.external_urls.spotify,
    } as SpotifyCurrentTrackResponse);
  } catch (error) {
    console.error("Error fetching Spotify data:", error);

    return NextResponse.json(
      { error: "Erro ao buscar dados do Spotify" },
      { status: 500 },
    );
  }
}
