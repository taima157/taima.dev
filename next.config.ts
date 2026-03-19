import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://i.scdn.co/**"),
      new URL("https://avatars.steamstatic.com/**"),
      new URL("https://cdn2.steamgriddb.com/**"),
      new URL("https://shared.akamai.steamstatic.com/**"),
    ],
  },
};

export default nextConfig;
