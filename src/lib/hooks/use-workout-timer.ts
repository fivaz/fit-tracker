import { useSyncExternalStore } from "react";

import { intervalToDuration } from "date-fns";

function formatDuration(start: Date, end: Date): string {
	const duration = intervalToDuration({ start, end });

	const h = (duration.hours || 0).toString().padStart(2, "0");
	const m = (duration.minutes || 0).toString().padStart(2, "0");
	const s = (duration.seconds || 0).toString().padStart(2, "0");

	return duration.hours ? `${h}:${m}:${s}` : `${m}:${s}`;
}

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
