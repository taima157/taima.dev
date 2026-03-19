import {
  SteamCurrentStatus,
  SteamGameDetailResponse,
  SteamGameIconResponse,
  SteamUserSummaryResponse,
} from "@/types/steam";
import { getSafeEnv, getFetch } from "@/lib/http";

export async function getSteamSummary() {
  const steamId = getSafeEnv("STEAM_ID");
  const steamApiKey = getSafeEnv("STEAM_API_KEY");

  const params = new URLSearchParams({
    key: steamApiKey,
    steamids: steamId,
  });

  try {
    const { result } = await getFetch<SteamUserSummaryResponse>(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2?${params.toString()}`,
    );

    return result?.response?.players?.[0] ?? null;
  } catch (error) {
    console.error("Error fetching Steam user summary:", error);
    return null;
  }
}

export async function getSteamGameDetail(gameId: string) {
  const params = new URLSearchParams({ appids: gameId });

  try {
    const { result } = await getFetch<SteamGameDetailResponse>(
      `https://store.steampowered.com/api/appdetails?${params.toString()}`,
    );

    return result?.[gameId]?.data ?? null;
  } catch (error) {
    console.error("Error fetching Steam game detail:", error);
    return null;
  }
}

export async function getSteamGameIcon(gameId: string) {
  const steamDbApiKey = getSafeEnv("STEAM_DB_API_KEY");

  try {
    const { result } = await getFetch<SteamGameIconResponse>(
      `https://www.steamgriddb.com/api/v2/icons/steam/${gameId}`,
      {
        headers: {
          Authorization: `Bearer ${steamDbApiKey}`,
        },
      },
    );

    const icons = result?.data ?? [];

    const officialIcon = icons.find((icon) => icon.style === "official");
    const customIcon = !officialIcon ? (icons[0] ?? null) : null;

    return officialIcon || customIcon;
  } catch (error) {
    console.error("Error fetching Steam game icon:", error);
    return null;
  }
}

export async function getSteamCurrentStatus(): Promise<SteamCurrentStatus | null> {
  const steamSummary = await getSteamSummary();

  if (!steamSummary) return null;

  const userData = {
    personaname: steamSummary.personaname,
    profileurl: steamSummary.profileurl,
    avatarfull: steamSummary.avatarfull,
  };

  if (!steamSummary.gameid) {
    return {
      isPlaying: false,
      user: userData,
    };
  }

  const [gameDetail, gameIcon] = await Promise.all([
    getSteamGameDetail(steamSummary.gameid),
    getSteamGameIcon(steamSummary.gameid),
  ]);

  return {
    isPlaying: true,
    user: userData,
    game: {
      name: gameDetail?.name,
      publishers: gameDetail?.publishers,
      icon: gameIcon?.thumb,
    },
  } as SteamCurrentStatus;
}
