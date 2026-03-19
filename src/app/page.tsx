import { AboutMe } from "@/components/about-me";
import { Social } from "@/components/social";
import { SpotifyStatus } from "@/components/spotify-status";
import { SteamMostPlayed } from "@/components/steam-most-played";
import { SteamStatus } from "@/components/steam-status";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center p-4">
      <div className="bg-white/2 border w-200 border-white/2 rounded-sm p-4 sm:p-8 flex flex-col gap-8">
        <div className="w-full flex flex-col gap-15">
          <div className="flex justify-between items-center flex-col sm:flex-row gap-10">
            <h1 className="text-4xl font-bold text-zinc-50 w-full">
              taima.dev
            </h1>
            <SpotifyStatus />
          </div>

          <AboutMe />
        </div>

        <hr className="text-zinc-800" />

        <div className="flex w-full gap-4 items-end sm:items-start flex-col">
          <SteamStatus />

          <SteamMostPlayed />
        </div>

        <Social />
      </div>
    </main>
  );
}
