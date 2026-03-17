import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";

const googleSans = Google_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "taima.dev",
  description: "Just a brazilian developer's personal website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${googleSans.className} bg-stone-950 text-slate-100`}>
      <body>{children}</body>
    </html>
  );
}
