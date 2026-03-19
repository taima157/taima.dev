import { SteamMostPlayedResponse } from "@/types/steam";

type SteamMostPlayedCardProps = {
  game: SteamMostPlayedResponse;
};

export function SteamMostPlayedCard({ game }: SteamMostPlayedCardProps) {
  return (
    <div className="w-full text-sm border border-white/4 rounded-md">
      <div
        style={{
          backgroundImage: `url(${game.headerImage})`,
        }}
        className="relative flex w-full h-20 rounded-md p-2 bg-cover items-end"
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent rounded-md" />

        <div className="relative z-10 w-full flex place-content-between gap-2">
          <span className="line-clamp-1 font-semibold">{game.name}</span>

          <span className="line-clamp-1 font-mono text-green-400">
            {(game.playtimeForever / 60).toLocaleString("en", {
              maximumFractionDigits: 1,
            })}{" "}
            h
          </span>
        </div>
      </div>
    </div>
  );
}
