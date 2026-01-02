import * as Sentry from "@sentry/nextjs";

type LogLevel = "info" | "warn" | "error";

interface LogOptions {
	level?: LogLevel;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	extra?: Record<string, any>;
}

/**
 * Reports an error or message to Sentry in non-development environments, and logs a styled, grouped message with details to the console in development.
 *
 * @param error - The value to report; if an `Error` instance its exception is captured (preserving stack/message), otherwise it is converted to a string and captured as a message.
 * @param options - Optional logging options.
 * @param options.level - Severity level: `"info"`, `"warn"`, or `"error"`. Defaults to `"error"`.
 * @param options.extra - Additional context to attach; sent to Sentry as extras or printed as a table in development.
 */
export function reportError(error: unknown, options: LogOptions = {}) {
	const { level = "error", extra } = options;
	const message = error instanceof Error ? error.message : String(error);

	if (process.env.NODE_ENV === "development") {
		const styles = {
			info: "color: #007bff; font-weight: bold;",
			warn: "color: #ffc107; font-weight: bold;",
			error: "color: #dc3545; font-weight: bold;",
		};

		console.group(`[DEV-LOG] ${level.toUpperCase()}: ${message}`);
		console.log("%cDetails:", styles[level], error);
		if (extra) console.table(extra);
		console.groupEnd();
	} else {
		Sentry.withScope((scope) => {
			if (extra) {
				scope.setExtras(extra);
			}
			scope.setLevel(level === "info" ? "info" : level === "warn" ? "warning" : "error");

			if (error instanceof Error) {
				Sentry.captureException(error);
			} else {
				Sentry.captureMessage(message);
			}
		});
	}
}