import type { Metadata } from "next";
import { Google_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const googleSans = Google_Sans({
  subsets: ["latin"],
  variable: "--font-google-sans",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "taima.dev",
  description: "Just a brazilian developer's personal website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${googleSans.variable} ${jetBrainsMono.variable} bg-stone-950 text-slate-100`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
