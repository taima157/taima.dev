import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

export const satoshi = localFont({
  src: "../../public/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "100 900",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "taima.dev",
  description: "Just a brazilian developer's personal website.",
  icons: {
    icon: "/icon.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${manrope.variable} ${jetBrainsMono.variable} bg-stone-950`}
    >
      <body className="font-manrope text-stone-200">{children}</body>
    </html>
  );
}
