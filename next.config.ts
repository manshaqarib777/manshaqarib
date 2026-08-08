import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Aligned with the layout's breakpoints so a `sizes` hint resolves to a real
    // candidate width instead of rounding up to the next default.
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },

  async headers() {
    return [
      {
        // Project media is versioned by filename and never mutated in place, so
        // it can be cached hard. `/work` is a route, not an asset directory —
        // the screenshots and walkthrough clips live under this prefix.
        source: "/portfolio-screenshots/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
