"use client";

import { useState } from "react";
import Image from "next/image";

import { Clock, Dumbbell, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { WorkoutSetRow } from "@/components/workout-set-row/workout-set-row";
import { Exercise } from "@/generated/prisma/client";
import { createSetAction, deleteSetAction, updateSetAction } from "@/lib/setlogs/action";

type SetEntry = {
	id: string;
	reps: string;
	weight: string;
	completedAt: string;
};

type WorkoutExerciseProps = {
	exercise: Exercise;
	sessionId: string;
};

export function WorkoutExercise({ exercise, sessionId }: WorkoutExerciseProps) {
	const [sets, setSets] = useState<SetEntry[]>([]);

	const handleAddSet = async () => {
		// Prevent multiple clicks while creating
		const nextOrder = sets.length;

		// 1. Call DB Action
		try {
			const newDbSet = await createSetAction(exercise.id, sessionId, nextOrder);

			// 2. Update local state with the actual DB object
			const formattedSet: SetEntry = {
				id: newDbSet.id,
				reps: String(newDbSet.reps || ""),
				weight: String(newDbSet.weight || ""),
				completedAt: "",
			};

			setSets((prev) => [...prev, formattedSet]);
		} catch (error) {
			console.error("Failed to create set:", error);
		}
	};

	const handleUpdate = async (id: string, data: Partial<SetEntry>) => {
		// 1. Optimistic Update (Instant UI feedback)
		setSets((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));

		// 2. Live DB Save (Background)
		try {
			await updateSetAction(id, {
				reps: data.reps ? parseInt(data.reps) : undefined,
				weight: data.weight ? parseFloat(data.weight) : undefined,
				completedAt: data.completedAt,
			});
		} catch (error) {
			console.error("Failed to sync set:", error);
			// TODO: Revert state if critical
		}
	};

	const handleDelete = async (id: string) => {
		// 1. Optimistic Update
		const previousSets = [...sets];
		setSets((prev) => prev.filter((s) => s.id !== id));

		// 2. DB Action
		try {
			await deleteSetAction(id);
		} catch (error) {
			console.error("Failed to delete set:", error);
			setSets(previousSets); // Rollback on error
			alert("Could not delete set. Check your connection.");
		}
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
					<p className="text-muted-foreground text-xs capitalize">{exercise.muscles.join(", ")}</p>
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
								onUpdate={handleUpdate}
								onDelete={handleDelete}
							/>
						))}
					</div>
				</CardContent>
			)}

			<CardFooter>
				<Button
					variant="outline"
					className="border-muted-foreground/30 hover:border-primary/50 text-muted-foreground hover:text-primary h-10 w-full gap-2 border-dashed transition-all"
					onClick={handleAddSet}
				>
					<Plus className="size-4" />
					Add Set
				</Button>
			</CardFooter>
		</Card>
	);
}
