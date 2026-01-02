"use client";

import { startTransition } from "react";
import Image from "next/image";

import { Dumbbell, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { WorkoutSetRow } from "@/components/workout/workout-set-row/workout-set-row";
import { SetLog } from "@/generated/prisma/client";
import { ExerciseUI } from "@/lib/exercise/types";
import { upsertSetAction } from "@/lib/set-logs/actions";
import { SetLogsProvider, useSetLogs } from "@/lib/set-logs/set-logs-context";
import { buildEmptySetLog } from "@/lib/set-logs/types";

type WorkoutExerciseProps = {
	exercise: ExerciseUI & { setLogs: SetLog[] };
	sessionId: string;
};

/**
 * Wraps the given exercise with a SetLogsProvider and renders its workout content.
 *
 * Initializes the provider with the exercise's `setLogs` so child components can read and modify set logs.
 *
 * @param exercise - Exercise data (including `setLogs`) used to render the exercise and initialize the set logs context
 * @param sessionId - Identifier of the current workout session passed through to the rendered content
 * @returns The rendered WorkoutExercise component tree with set logs context applied
 */
export function WorkoutExercise({ exercise, sessionId }: WorkoutExerciseProps) {
	return (
		<SetLogsProvider initialItems={exercise.setLogs}>
			<WorkoutExerciseContent exercise={exercise} sessionId={sessionId} />
		</SetLogsProvider>
	);
}

/**
 * Render an exercise card showing its image, name, targeted muscles, current sets, and an "Add Set" action.
 *
 * When the add action is triggered, a new empty set is appended to the exercise's set logs and persisted for the given session.
 *
 * @param exercise - Exercise data (includes display fields and initial `setLogs`) to render
 * @param sessionId - Identifier of the workout session used when creating or persisting sets
 * @returns A React element representing the exercise section, its set rows, and an Add Set control
 */
function WorkoutExerciseContent({ exercise, sessionId }: WorkoutExerciseProps) {
	const { items: sets, addItem } = useSetLogs();

	const handleAddSet = async () => {
		const newSet = buildEmptySetLog({
			id: crypto.randomUUID(),
			exerciseId: exercise.id,
			sessionId,
			order: sets.length,
		});

		startTransition(async () => {
			addItem(newSet);
			await upsertSetAction(newSet.id, sessionId, exercise.id, newSet);
		});
	};

	return (
		<Card className="bg-muted/40 overflow-hidden shadow-none">
			<CardHeader className="flex flex-row items-center gap-4">
				<div className="bg-muted flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-md border">
					{exercise.image ? (
						<Image
							src={exercise.image}
							alt={exercise.name}
							width={60}
							height={60}
							className="size-full object-cover"
						/>
					) : (
						<Dumbbell className="text-muted-foreground size-6" />
					)}
				</div>
				<div className="flex flex-col">
					<h3 className="text-lg leading-tight font-bold">{exercise.name}</h3>
					<p className="text-muted-foreground text-xs capitalize">{exercise.muscles?.join(", ")}</p>
				</div>
			</CardHeader>

			{sets.length > 0 && (
				<CardContent>
					<div className="space-y-3">
						{sets.map((set, index) => (
							<WorkoutSetRow
								key={set.id}
								index={index}
								set={set}
								sessionId={sessionId}
								exerciseId={exercise.id}
							/>
						))}
					</div>
				</CardContent>
			)}

			<CardFooter>
				<Button
					onClick={handleAddSet}
					variant="outline"
					className="border-muted-foreground/30 hover:border-primary/50 text-muted-foreground hover:text-primary h-10 w-full gap-2 border-dashed transition-all"
				>
					<Plus className="size-4" />
					Add Set
				</Button>
			</CardFooter>
		</Card>
	);
}