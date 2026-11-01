import type { NextConfig } from "next";
import path from "path";

if (!process.env.NEXT_TEST_WASM_DIR) {
  process.env.NEXT_TEST_WASM_DIR = path.resolve(process.cwd(), "node_modules/next/wasm");
}

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next_build",
  eslint: {
    // Avoids worker hanging with FlatCompat under Node 24 Windows during next build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Strictly enforce TypeScript type-safety during build
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
