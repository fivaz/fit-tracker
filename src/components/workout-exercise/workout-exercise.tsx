"use client";

import Image from "next/image";

import { Dumbbell, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { WorkoutSetRow } from "@/components/workout-set-row/workout-set-row";
import { Exercise, SetLog } from "@/generated/prisma/client";
import { ExerciseUI } from "@/lib/exercise/types";

import { SetEntry, useWorkoutSets } from "./use-workout-sets";

type WorkoutExerciseProps = {
	exercise: ExerciseUI & { setLogs: SetLog[] };
	sessionId: string;
};

export function WorkoutExercise({ exercise, sessionId }: WorkoutExerciseProps) {
	const { sets, addSet, updateSet, deleteSet } = useWorkoutSets(
		exercise.setLogs ?? [],
		exercise.id,
		sessionId,
	);

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
								set={set as SetEntry}
								onUpdate={updateSet}
								onDelete={deleteSet}
							/>
						))}
					</div>
				</CardContent>
			)}

			<CardFooter>
				<Button
					variant="outline"
					className="border-muted-foreground/30 hover:border-primary/50 text-muted-foreground hover:text-primary h-10 w-full gap-2 border-dashed transition-all"
					onClick={addSet}
				>
					<Plus className="size-4" />
					Add Set
				</Button>
			</CardFooter>
		</Card>
	);
}
