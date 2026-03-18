import { AboutMe } from "@/components/about-me";
import { SpotifyStatus } from "@/components/spotify-status";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center p-4 text-stone-200">
      <div className="bg-white/2 border w-200 border-white/2 rounded-sm p-8 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-stone-50">taima.dev</h1>

          <Image className="rounded" src="/icon.jpg" alt="Icon" width={100} height={100} />
        </div>

        <hr className="text-stone-800" />

        <AboutMe />

        <hr className="text-stone-800" />

        <SpotifyStatus />
      </div>
    </main>
  );
}
