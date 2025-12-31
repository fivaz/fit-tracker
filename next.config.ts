import type { NextConfig } from "next";
// import withRspack from "next-rspack";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		remotePatterns: [
			new URL("https://fztmquxyyfalsgsgftix.supabase.co/**"),
			new URL("https://lh3.googleusercontent.com/**"),
		],
	},
};

export default nextConfig;
// export default withRspack(nextConfig);
