import {
  SteamGameDetailResponse,
  SteamGameIconResponse,
  SteamUserSummaryResponse,
} from "@/types/steam";

export async function getSteamSummary() {
  const steamId = process.env.STEAM_ID!;
  const steamApiKey = process.env.STEAM_API_KEY!;

  const params = new URLSearchParams({
    key: steamApiKey,
    steamids: steamId,
  });

  const res = await fetch(
    `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2?${params.toString()}`,
    {
      method: "GET",
    },
  );

  const result = (await res.json()) as SteamUserSummaryResponse;
  const player = result.response.players[0];

  return !!player ? player : null;
}

export async function getSteamGameDetail(gameId: string) {
  const params = new URLSearchParams({
    appids: gameId,
  });

  const res = await fetch(
    `https://store.steampowered.com/api/appdetails?${params.toString()}`,
    {
      method: "GET",
    },
  );

  const result = (await res.json()) as SteamGameDetailResponse;
  const game = result[gameId].data;

  return !!game ? game : null;
}

export async function getSteamGameIcon(gameId: string) {
  const steamDbApiKey = process.env.STEAM_DB_API_KEY!;

  const res = await fetch(
    `https://www.steamgriddb.com/api/v2/icons/steam/${gameId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${steamDbApiKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  const result = (await res.json()) as SteamGameIconResponse;
  const officialIcon = result.data.find((icon) => icon.style === "official");
  const customIcon = !officialIcon ? result.data[0] : null;

  return officialIcon ? officialIcon : customIcon ? customIcon : null;
}
