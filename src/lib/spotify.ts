import { getSafeEnv, getFetch, postFetch, HttpError } from "@/lib/http";
import {
  Artist,
  SpotifyCurrentTrack,
  SpotifyCurrentTrackResponse,
  SpotifyToken,
} from "@/types/spotify";

let tokenCache: {
  accessToken: string;
  expiresAt: number;
} | null = null;

export async function getAccessToken() {
  const now = Date.now();

  if (tokenCache && now < tokenCache.expiresAt) {
    return tokenCache.accessToken;
  }

  const clientId = getSafeEnv("SPOTIFY_CLIENT_ID");
  const clientSecret = getSafeEnv("SPOTIFY_CLIENT_SECRET");
  const refreshToken = getSafeEnv("SPOTIFY_REFRESH_TOKEN");

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  try {
    const { result } = await postFetch<SpotifyToken, URLSearchParams>(
      "https://accounts.spotify.com/api/token",
      body,
      {
        headers: {
          Authorization: `Basic ${basic}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    if (result) {
      tokenCache = {
        accessToken: result.access_token,
        expiresAt: now + (result.expires_in - 60) * 1000,
      };

      return tokenCache.accessToken;
    }

    return null;
  } catch (error) {
    console.error("Error fetching Spotify access token:", error);
    return null;
  }
}

export async function fetchCurrentTrack(accessToken: string) {
  if (!accessToken) throw new Error("No access token");

  return await getFetch<SpotifyCurrentTrack>(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );
}

export async function getCurrentTrack() {
  let accessToken = await getAccessToken();

  try {
    const { result } = await fetchCurrentTrack(accessToken!);

    return result;
  } catch (error: HttpError | unknown) {
    if (error instanceof HttpError && error.status === 401) {
      tokenCache = null;
      accessToken = await getAccessToken();
      const { result } = await fetchCurrentTrack(accessToken!);

      return result;
    }

    throw error;
  }
}

export async function getSpotifyCurrentStatus(): Promise<SpotifyCurrentTrackResponse> {
  const currentTrack = await getCurrentTrack();

  if (!currentTrack || !currentTrack.item) {
    return {
      online: false,
    };
  }

  const item = currentTrack.item;

  return {
    online: true,
    track: {
      isPlaying: currentTrack.is_playing,
      title: item.name,
      artist: item.artists.map((a: Artist) => a.name).join(" | "),
      album: item.album.name,
      image: item.album.images[0],
      url: item.external_urls.spotify,
    },
  };
}
