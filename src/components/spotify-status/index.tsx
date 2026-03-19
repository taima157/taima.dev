"use client";

import { SpotifyCurrentTrackResponse } from "@/types/spotify";
import { Headphones } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function SpotifyPlayingStatus({
  online = false,
  isPlaying = false,
}: {
  online: boolean;
  isPlaying: boolean;
}) {
  const status = online ? (isPlaying ? "playing" : "paused") : "offline";
  const color = online
    ? isPlaying
      ? "text-green-500"
      : "text-yellow-500"
    : "text-stone-600";

  return (
    <span
      className={`${color} font-mono ${isPlaying ? "animate-pulse backdrop-blur" : ""} uppercase text-sm  align-middle flex items-center`}
    >
      {status}
      <div className="rounded-full bg-current w-[0.4rem] h-[0.4rem] ml-2 inline-block" />
    </span>
  );
}

function SpotifySkeleton() {
  return (
    <div className="flex gap-4 items-center w-full justify-end">
      <div className="flex flex-col gap-1 items-end text-right">
        <div className="h-4 w-20 bg-white/5 animate-pulse backdrop-blur rounded" />
        <div className="h-5 w-32 bg-white/5 animate-pulse backdrop-blur rounded" />
        <div className="h-4 w-40 bg-white/5 animate-pulse backdrop-blur rounded" />
      </div>

      <div className="h-20 w-20 rounded-sm bg-white/4 flex items-center animate-pulse backdrop-blur justify-center">
        <Headphones
          className="text-stone-800"
          style={{ width: 40, height: 40 }}
        />
      </div>
    </div>
  );
}

export function SpotifyStatus() {
  const { data, isLoading } = useSWR<SpotifyCurrentTrackResponse>(
    "/api/spotify/current",
    fetcher,
    { refreshInterval: 5000 },
  );

  if (isLoading) return <SpotifySkeleton />;

  const isOnline = data?.online;

  return (
    <div className="flex gap-4 items-center w-full justify-end">
      <div className="flex flex-col gap-1 flex-1 min-w-0 items-end text-right">
        <SpotifyPlayingStatus
          online={!!isOnline}
          isPlaying={!!data?.isPlaying}
        />

        {isOnline ? (
          <Link
            className="hover:underline"
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="block truncate w-full overflow-hidden">
              {data.title}
            </span>
          </Link>
        ) : (
          <span className="block truncate w-full overflow-hidden">
            spotify offline
          </span>
        )}

        <span className="block text-xs text-stone-400 truncate w-full overflow-hidden">
          {isOnline ? `${data.artist} - ${data.album}` : ";-;"}
        </span>
      </div>

      {isOnline && data?.image?.url ? (
        <Link
          className="shrink-0"
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="rounded-md block"
            src={data.image.url}
            alt="Spotify current track image"
            width={80}
            height={80}
          />
        </Link>
      ) : (
        <div className="h-20 w-20 rounded-sm bg-white/4 flex items-center justify-center">
          <Headphones
            className="text-stone-800"
            style={{ width: 40, height: 40 }}
          />
        </div>
      )}
    </div>
  );
}
