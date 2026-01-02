"use client";

import { useEffect } from "react";
import NextError from "next/error";

import * as Sentry from "@sentry/nextjs";

/**
 * Captures the given error in Sentry and renders Next.js's generic error page.
 *
 * @param error - The Error object to report; may include an optional `digest` string for grouping.
 * @returns A minimal HTML document that renders Next.js's default error page with a generic message.
 */
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
	useEffect(() => {
		Sentry.captureException(error);
	}, [error]);

	return (
		<html lang="en">
			<body>
				{/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
				<NextError statusCode={0} />
			</body>
		</html>
	);
}