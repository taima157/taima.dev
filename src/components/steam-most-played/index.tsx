"use client";

import { SteamMostPlayedResponse } from "@/types/steam";
import useSWR from "swr";
import { SteamMostPlayedCard } from "../steam-most-played-card";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function SteamMostPlayedSkeleton() {
  return (
    <div className="flex gap-4 items-center w-full md:w-[50%] flex-col">
      <div className="h-13 w-full bg-white/5 animate-pulse backdrop-blur flex rounded pl-2 pr-2"></div>
      <div className="h-13 w-full bg-white/5 animate-pulse backdrop-blur flex rounded pl-2 pr-2"></div>
      <div className="h-13 w-full bg-white/5 animate-pulse backdrop-blur flex rounded pl-2 pr-2"></div>
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
    <div className="flex gap-4 items-center w-full md:w-[50%] flex-col">
      {mostPlayed.map((item, index) => {
        return <SteamMostPlayedCard key={index} game={item} />;
      })}
    </div>
  );
}
