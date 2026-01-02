import { useSyncExternalStore } from "react";

import { intervalToDuration } from "date-fns";

/**
 * Format the elapsed time between two dates as a zero-padded clock string.
 *
 * @param start - The start time of the interval
 * @param end - The end time of the interval
 * @returns A string of the form `HH:MM:SS` when the elapsed hours are greater than zero, otherwise `MM:SS`. Hours, minutes, and seconds are each zero-padded to two digits.
 */
function formatDuration(start: Date, end: Date): string {
	const duration = intervalToDuration({ start, end });

	const h = (duration.hours || 0).toString().padStart(2, "0");
	const m = (duration.minutes || 0).toString().padStart(2, "0");
	const s = (duration.seconds || 0).toString().padStart(2, "0");

	return duration.hours ? `${h}:${m}:${s}` : `${m}:${s}`;
}

/**
 * Provides a value that updates every second with the formatted elapsed time since `startedAt`.
 *
 * @param startedAt - The start time of the workout (reference point for elapsed time)
 * @returns The elapsed time formatted as `HH:MM:SS` when hours are present, otherwise `MM:SS`
 */
export function useWorkoutTimer(startedAt: Date) {
	return useSyncExternalStore(
		(callback) => {
			const id = setInterval(callback, 1000);
			return () => clearInterval(id);
		},
		() => formatDuration(new Date(startedAt), new Date()),
		() => "00:00",
	);
}