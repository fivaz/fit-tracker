import withRspack from 'next-rspack';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default withRspack(nextConfig);