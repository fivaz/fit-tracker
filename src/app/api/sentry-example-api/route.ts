import * as Sentry from "@sentry/nextjs";
export const dynamic = "force-dynamic";

class SentryExampleAPIError extends Error {
	constructor(message: string | undefined) {
		super(message);
		this.name = "SentryExampleAPIError";
	}
}

/**
 * Handle GET requests by deliberately raising a SentryExampleAPIError to exercise Sentry error monitoring.
 *
 * This route logs an informational message and then throws the error so Sentry can capture it.
 *
 * @throws SentryExampleAPIError - raised to simulate a backend error for Sentry monitoring
 */
export function GET() {
	Sentry.logger.info("Sentry example API called");
	throw new SentryExampleAPIError(
		"This error is raised on the backend called by the example page.",
	);
}