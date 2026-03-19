import {
  SteamCurrentStatus,
  SteamGameDetailResponse,
  SteamGameIconResponse,
  SteamMostPlayedResponse,
  SteamOwnedGame,
  SteamOwnedGameResponse,
  SteamUserSummaryResponse,
} from "@/types/steam";
import { getSafeEnv, getFetch } from "@/lib/http";

const STEAM_MOST_PLAYED_MAX_GAMES = 3;
const steamId = getSafeEnv("STEAM_ID");
const steamApiKey = getSafeEnv("STEAM_API_KEY");
const steamDbApiKey = getSafeEnv("STEAM_DB_API_KEY");

export async function getSteamSummary() {
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

export async function getSteamOwnedGames(): Promise<SteamOwnedGame[]> {
  const params = new URLSearchParams({
    key: steamApiKey,
    steamid: steamId,
    include_played_free_games: "true",
  });

  try {
    const { result } = await getFetch<SteamOwnedGameResponse>(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001?${params.toString()}`,
    );

    return result?.response.games || [];
  } catch (error) {
    console.error("Error fetching Steam owned games:", error);
    return [];
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

export async function getSteamMostPlayed(): Promise<SteamMostPlayedResponse[]> {
  const ownedGames = await getSteamOwnedGames();

  const mostPlayedGames = [...ownedGames]
    .sort((a, b) => b.playtime_forever - a.playtime_forever)
    .slice(0, STEAM_MOST_PLAYED_MAX_GAMES);

  const results = await Promise.all(
    mostPlayedGames.map(async (mostPlayed) => {
      const gameDetail = await getSteamGameDetail(mostPlayed.appid.toString());

      if (!gameDetail) return null;

      return {
        name: gameDetail.name,
        headerImage: gameDetail.header_image,
        playtimeForever: mostPlayed.playtime_forever,
      };
    }),
  );

  return results.filter(Boolean) as SteamMostPlayedResponse[];
}
