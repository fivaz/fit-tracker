import withRspack from "next-rspack";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
};

export default nextConfig;
// export default withRspack(nextConfig);
