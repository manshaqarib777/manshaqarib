import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tree-shakes barrel-file imports so `import { FiArrowUpRight } from
  // "react-icons/fi"` pulls in one icon rather than the whole set.
  experimental: {
    optimizePackageImports: ["react-icons", "framer-motion"],
  },

  images: {
    // The placeholder artwork is SVG, which Next's optimizer passes through
    // rather than rasterising — these formats start paying off once real
    // photography replaces it.
    formats: ["image/avif", "image/webp"],
    // Aligned with the layout's breakpoints so a `sizes` hint resolves to a real
    // candidate width instead of rounding up to the next default.
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },

  async headers() {
    return [
      {
        // Project artwork is versioned by filename and never mutated in place, so
        // it can be cached hard.
        source: "/work/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
