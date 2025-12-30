"use client";

import { useEffect, useState } from "react";

import { formatDuration, intervalToDuration } from "date-fns";

import { Button } from "@/components/ui/button";
import { endWorkout } from "@/lib/workout/action";

type WorkoutHeaderProps = {
	sessionId: string;
	startedAt: Date;
	programName: string;
};

export function WorkoutHeader({ sessionId, startedAt, programName }: WorkoutHeaderProps) {
	const [elapsed, setElapsed] = useState("00:00");
	const [isPending, setIsPending] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const start = new Date(startedAt);

			// 1. Get the duration object { hours, minutes, seconds }
			const duration = intervalToDuration({ start, end: now });

			// 2. Format it into a string
			// We manually pad it to keep the 00:00:00 digital clock look
			const h = (duration.hours || 0).toString().padStart(2, "0");
			const m = (duration.minutes || 0).toString().padStart(2, "0");
			const s = (duration.seconds || 0).toString().padStart(2, "0");

			setElapsed(duration.hours ? `${h}:${m}:${s}` : `${m}:${s}`);
		}, 1000);

		return () => clearInterval(interval);
	}, [startedAt]);

	const handleEnd = async () => {
		if (confirm("Finish workout?")) {
			setIsPending(true);
			await endWorkout(sessionId);
		}
	};

	return (
		<header className="bg-card sticky top-0 z-30 flex items-center justify-between border-b px-4 py-4 shadow-sm">
			<div className="flex flex-col">
				<span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
					{programName}
				</span>
				<span className="text-primary font-mono text-2xl font-black tabular-nums">{elapsed}</span>
			</div>

			<Button
				variant="destructive"
				onClick={handleEnd}
				disabled={isPending}
				className="shadow-destructive/20 rounded-full px-6 shadow-lg"
			>
				{isPending ? "Ending..." : "End Workout"}
			</Button>
		</header>
	);
}
