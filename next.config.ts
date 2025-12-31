import type { NextConfig } from "next";

// import withRspack from "next-rspack";
import pkg from "./package.json";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	env: {
		NEXT_PUBLIC_APP_VERSION: pkg.version,
	},
	images: {
		remotePatterns: [
			new URL("https://fztmquxyyfalsgsgftix.supabase.co/**"),
			new URL("https://lh3.googleusercontent.com/**"),
		],
	},
};

export default nextConfig;
// export default withRspack(nextConfig);
