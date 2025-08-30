import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  reactStrictMode: true,
};

export default withMDX(nextConfig);
