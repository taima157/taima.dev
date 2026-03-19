import type { Metadata } from "next";
import { Manrope, Google_Sans_Code } from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const googleSansCode = Google_Sans_Code({
  subsets: ["latin"],
  variable: "--font-sans-code",
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
      className={`${manrope.variable} ${googleSansCode.variable} bg-zinc-950`}
    >
      <body className="font-manrope text-zinc-200">{children}</body>
    </html>
  );
}
