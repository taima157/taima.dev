"use client";

import { SpotifyCurrentTrackResponse } from "@/types/spotify";
import { JetBrains_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

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
      className={`${color} ${jetBrainsMono.className} ${isPlaying ? "animate-pulse" : ""} uppercase text-sm font-semibold align-middle flex items-center`}
    >
      <div className="rounded-full bg-current w-[0.4rem] h-[0.4rem] mr-2 inline-block" />
      {status}
    </span>
  );
}

function SpotifySkeleton() {
  return (
    <div className="flex gap-4 items-center">
      <div className="h-20 w-20 rounded-sm bg-white/5 animate-pulse" />

      <div className="flex flex-col gap-1">
        <div className="h-4 w-20 bg-white/5 animate-pulse rounded" />
        <div className="h-5 w-32 bg-white/5 animate-pulse rounded" />
        <div className="h-4 w-40 bg-white/5 animate-pulse rounded" />
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
    <div className="flex gap-4 items-center">
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
        <div className="h-20 w-20 rounded-sm bg-white/5" />
      )}

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <SpotifyPlayingStatus
          online={!!isOnline}
          isPlaying={!!data?.isPlaying}
        />

        {isOnline ? (
          <span className="block truncate w-full overflow-hidden">{data.title}</span>
        ) : (
          <div className="h-5 w-32 bg-white/5 animate-pulse block rounded" />
        )}

        {isOnline ? (
          <span className="block text-xs text-stone-400 truncate w-full overflow-hidden">
            {data.artist} - {data.album}
          </span>
        ) : (
          <div className="h-4 w-40 bg-white/5 animate-pulse rounded" />
        )}
      </div>
    </div>
  );
}
