"use client";

import { SteamCurrentStatus, SteamGame } from "@/types/steam";
import { VideogameAsset } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function SteamSkeleton() {
  return (
    <div className="flex gap-4 items-center w-full">
      <div className="h-20 w-20 rounded-md bg-white/2 shrink-0 flex items-center justify-center">
        <VideogameAsset
          className="text-zinc-800"
          style={{ width: 40, height: 40 }}
        />
      </div>

      <div className="flex flex-col items-start gap-2 flex-1 min-w-0">
        <div className="h-4 w-24 bg-white/2 animate-pulse backdrop-blur rounded" />

        <div className="flex items-center gap-2 w-full">
          <div className="h-6 w-6 rounded bg-white/2 animate-pulse backdrop-blur shrink-0" />

          <div className="flex flex-col gap-1 w-full">
            <div className="h-4 w-40 bg-white/2 animate-pulse backdrop-blur rounded" />
            <div className="h-4 w-28 bg-white/2 animate-pulse backdrop-blur rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SteamPlayingStatus({
  isPlaying,
  game,
}: {
  isPlaying: boolean;
  game?: SteamGame;
}) {
  if (!isPlaying || !game) {
    return (
      <span className="text-zinc-500 font-semibold align-middle flex items-center">
        offline from steam ;-;
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Image
        className="rounded-md block shrink-0"
        src={game.icon}
        alt="Current game icon playing on Steam"
        width={25}
        height={25}
      />

      <span className="text-sm font-semibold text-green-400 animate-pulse backdrop-blur line-clamp-2">
        {game.name} <span className="text-green-600">- Currently playing</span>
      </span>
    </div>
  );
}

export function SteamStatus() {
  const { data, isLoading } = useSWR<SteamCurrentStatus>(
    "/api/steam/current",
    fetcher,
    {
      refreshInterval: (60 * 1000) / 2,
    },
  );

  if (isLoading) return <SteamSkeleton />;

  const isPlaying = data?.isPlaying;

  return (
    <div className="flex gap-4 items-center w-full">
      {data?.user ? (
        <Image
          className="rounded-md block"
          src={data.user.avatarfull}
          alt="Steam user avatar"
          width={80}
          height={80}
        />
      ) : (
        <div className="h-20 w-20 rounded-md bg-white/2 shrink-0 flex items-center justify-center">
          <VideogameAsset
            className="text-zinc-800"
            style={{ width: 40, height: 40 }}
          />
        </div>
      )}

      <div className="flex flex-col items-start gap-2 flex-1 min-w-0">
        {data?.user && (
          <Link
            className="hover:underline inline-block"
            href={data.user.profileurl}
            target="_blank"
          >
            <h3 className="uppercase font-mono">{data.user.personaname}</h3>
          </Link>
        )}

        <SteamPlayingStatus isPlaying={!!isPlaying} game={data?.game} />
      </div>
    </div>
  );
}
