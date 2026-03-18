import { SpotifyCurrentTrack, SpotifyToken } from "@/types/spotify";

let accessToken: string | null = null;
let tokenExpiresAt = 0;

export async function getAccessToken() {
  const now = Date.now();

  if (accessToken && now < tokenExpiresAt) {
    console.log("Old access token is still valid");

    return accessToken;
  }

  console.log("New access token generated");

  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const data = (await res.json()) as SpotifyToken;

  accessToken = data.access_token;

  tokenExpiresAt = now + (data.expires_in - 60) * 1000;

  return accessToken;
}

export async function getCurrentlyPlaying(accessToken: string) {
  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (res.status === 204) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Error fetching currently playing track");
  }

  return res.json() as Promise<SpotifyCurrentTrack>;
}
