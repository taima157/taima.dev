export type SteamUserSummary = {
  personaname: string;
  profileurl: string;
  avatarfull: string;
  gameid?: string;
};

export type SteamUserSummaryResponse = {
  response: {
    players: SteamUserSummary[];
  };
};

export type SteamGameDetail = {
  name: string;
  publishers: string[];
  header_image: string;
};

export type SteamGameDetailResponse = {
  [key: string]: {
    data: SteamGameDetail;
  };
};

export type SteamGameIcon = {
  style: "official" | "custom" | string;
  thumb: string;
};

export type SteamGameIconResponse = {
  data: SteamGameIcon[];
};

export type SteamGame = {
  name?: string;
  publishers?: string[];
  icon?: string;
};

export type SteamCurrentStatus = {
  user: {
    personaname: string;
    profileurl: string;
    avatarfull: string;
  };
  isPlaying: boolean;
  game?: SteamGame;
};

export type SteamOwnedGame = {
  appid: number;
  playtime_forever: number;
};

export type SteamOwnedGameResponse = {
  response: {
    game_count: number;
    games: SteamOwnedGame[];
  };
};

export type SteamMostPlayedResponse = {
  name: string;
  playtimeForever: number;
  headerImage: string;
};
