import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Compose multiple CSS class values into a single, deduplicated class string with Tailwind-specific merging.
 *
 * @param inputs - One or more class values (strings, arrays, or objects) to be combined
 * @returns The resulting class string with duplicates removed and Tailwind utility conflicts merged
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Delay execution by the specified number of milliseconds when running in development.
 *
 * @param ms - Delay duration in milliseconds (default: 1000)
 * @returns `undefined` after the delay in development; `undefined` immediately in other environments
 */
export async function devDelay(ms: number = 1000) {
	if (process.env.NODE_ENV === "development") {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}