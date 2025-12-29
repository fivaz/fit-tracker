import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/lib/auth"; // path to your auth file

const handler = toNextJsHandler(auth);

export const POST = async (req: Request) => {
	console.log("--- [API ROUTE] POST request to:", req.url);
	const res = await handler.POST(req);
	console.log("--- [API ROUTE] Response Status:", res.status);
	return res;
};

export const GET = handler.GET;
