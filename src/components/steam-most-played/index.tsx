"use client";

import { SteamMostPlayedResponse } from "@/types/steam";
import useSWR from "swr";
import { SteamMostPlayedCard } from "../steam-most-played-card";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function SteamMostPlayedSkeleton() {
  return (
    <div className="grid gap-4 items-center w-full sm:grid-cols-3">
      <div className="h-20 w-full bg-white/2 animate-pulse backdrop-blur flex rounded-md pl-2 pr-2 border border-white/4"></div>
      <div className="h-20 w-full bg-white/2 animate-pulse backdrop-blur flex rounded-md pl-2 pr-2 border border-white/4"></div>
      <div className="h-20 w-full bg-white/2 animate-pulse backdrop-blur flex rounded-md pl-2 pr-2 border border-white/4"></div>
    </div>
  );
}

export function SteamMostPlayed() {
  const { data, isLoading } = useSWR<SteamMostPlayedResponse[]>(
    "/api/steam/most-played",
    fetcher,
    { revalidateOnFocus: false },
  );

  if (isLoading) return <SteamMostPlayedSkeleton />;

  const mostPlayed = data || [];

  return (
    <div className="grid gap-4 items-center w-full sm:grid-cols-3">
      {mostPlayed.map((item, index) => {
        return <SteamMostPlayedCard key={index} game={item} />;
      })}
    </div>
  );
}
