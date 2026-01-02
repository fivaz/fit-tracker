import * as Sentry from "@sentry/nextjs";

/**
 * Initializes Sentry when running in production by loading the runtime-appropriate configuration.
 *
 * Only performs initialization if NODE_ENV equals "production". Loads the server configuration when
 * NEXT_RUNTIME is "nodejs" and the edge configuration when NEXT_RUNTIME is "edge".
 */
export async function register() {
	// Only register Sentry in production
	if (process.env.NODE_ENV !== "production") return;

	if (process.env.NEXT_RUNTIME === "nodejs") {
		await import("../sentry.server.config");
	}

	if (process.env.NEXT_RUNTIME === "edge") {
		await import("../sentry.edge.config");
	}
}

export const onRequestError = Sentry.captureRequestError;