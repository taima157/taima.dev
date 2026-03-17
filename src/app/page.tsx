import { AboutMe } from "@/components/aboutme";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center p-4">
      <div className="bg-white/2 border w-3/6 border-white/2 rounded-sm p-8 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">taima.dev</h1>

          <Image src="/icon.jpg" alt="Icon" width={100} height={100} />
        </div>

        <hr className="text-stone-800" />

        <AboutMe />
      </div>
    </main>
  );
}
