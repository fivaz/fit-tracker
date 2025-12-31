"use client";

import { useState } from "react";

import { Timer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/lib/hooks/use-confirm";
import { useWorkoutTimer } from "@/lib/hooks/use-workout-timer";
import { endWorkout } from "@/lib/workout/action";

type WorkoutHeaderProps = {
	sessionId: string;
	startedAt: Date;
	programName: string;
};

export function WorkoutHeader({ sessionId, startedAt, programName }: WorkoutHeaderProps) {
	const [isPending, setIsPending] = useState(false);
	const elapsed = useWorkoutTimer(startedAt);
	const confirm = useConfirm();

	const handleEnd = async () => {
		if (
			!(await confirm({
				title: "Finish workout?",
				message: "Are you done? Once confirmed, this session cannot be edited.",
			}))
		)
			return;

		setIsPending(true);
		await endWorkout(sessionId);
	};

	return (
		<header className="bg-card sticky top-0 z-30 flex items-center justify-between border-b px-4 py-4 shadow-sm">
			<div className="flex flex-col">
				<span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
					{programName}
				</span>
				<span className="text-primary font-mono text-2xl font-black tabular-nums">{elapsed}</span>
			</div>

			<Button variant="destructive" onClick={handleEnd} disabled={isPending} className="">
				<Timer className="size-5" />
				{isPending ? "Ending..." : "End Workout"}
			</Button>
		</header>
	);
}
