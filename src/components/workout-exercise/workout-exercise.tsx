"use client";

import { useState } from "react";
import Image from "next/image";

import { Dumbbell, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { WorkoutSetRow } from "@/components/workout-set-row/workout-set-row";
import { Exercise, SetLog } from "@/generated/prisma/client";
import { createSetAction, deleteSetAction, updateSetAction } from "@/lib/setlogs/action";

type SetEntry = {
	id: string;
	reps: string;
	weight: string;
	completedAt: Date | null;
};

type WorkoutExerciseProps = {
	exercise: Exercise & { setLogs: SetLog[] };
	sessionId: string;
};

export function WorkoutExercise({ exercise, sessionId }: WorkoutExerciseProps) {
	const [sets, setSets] = useState<SetEntry[]>(
		exercise.setLogs.map((log) => ({
			id: log.id,
			reps: String(log.reps ?? ""),
			weight: String(log.weight ?? ""),
			completedAt: log.completedAt,
		})),
	);

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
				completedAt: null,
			};

			setSets((prev) => [...prev, formattedSet]);
		} catch (error) {
			console.error("Failed to create set:", error);
			toast.error("Could not create set. Check your connection.");
		}
	};

	const handleUpdate = async (id: string, data: Partial<SetEntry>) => {
		// 1. Save snapshot of current state for rollback
		const previousSets = [...sets];

		// 2. Apply Optimistic Update (Instant UI change)
		setSets((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));

		// 3. Live DB Save
		try {
			await updateSetAction(id, {
				reps: data.reps ? parseInt(data.reps) : undefined,
				weight: data.weight ? parseFloat(data.weight) : undefined,
				completedAt: data.completedAt ?? undefined,
			});
		} catch (error) {
			console.error("Failed to sync set:", error);

			// 4. Rollback to the previous state on failure
			setSets(previousSets);

			// Notify user (Optional: use a toast library like sonner)
			toast.error("Connection lost. Changes were not saved.");
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
			toast.error("Could not delete set. Check your connection.");
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
