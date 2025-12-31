"use client";

import { useState } from "react";
import Image from "next/image";

import { Clock, Dumbbell, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Exercise } from "@/generated/prisma/client";

type SetEntry = {
	id: string;
	reps: string;
	weight: string;
	completedAt: string;
};

type WorkoutExerciseProps = {
	exercise: Exercise;
};

export function WorkoutExercise({ exercise }: WorkoutExerciseProps) {
	const [sets, setSets] = useState<SetEntry[]>([]);

	const addSet = () => {
		const newSet: SetEntry = {
			id: crypto.randomUUID(),
			reps: "",
			weight: "",
			completedAt: "",
		};
		setSets([...sets, newSet]);
	};

	const removeSet = (id: string) => {
		setSets(sets.filter((set) => set.id !== id));
	};

	const updateSet = (id: string, field: keyof SetEntry, value: string) => {
		setSets(sets.map((set) => (set.id === id ? { ...set, [field]: value } : set)));
	};

	const markCompleted = (id: string) => {
		const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
		updateSet(id, "completedAt", now);
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

			<CardContent className="">
				<div className="space-y-3">
					{sets.map((set, index) => (
						<div
							key={set.id}
							className="group animate-in fade-in slide-in-from-left-2 flex items-center gap-2"
						>
							<div className="text-muted-foreground w-6 flex-none text-xs font-bold">
								{index + 1}
							</div>

							<div className="grid flex-1 grid-cols-3 gap-2">
								<Input
									type="number"
									placeholder="kg"
									value={set.weight}
									onChange={(e) => updateSet(set.id, "weight", e.target.value)}
									className="h-9 text-center tabular-nums"
								/>
								<Input
									type="number"
									placeholder="reps"
									value={set.reps}
									onChange={(e) => updateSet(set.id, "reps", e.target.value)}
									className="h-9 text-center tabular-nums"
								/>
								<Button
									variant={set.completedAt ? "ghost" : "outline"}
									size="sm"
									onClick={() => markCompleted(set.id)}
									className="h-9 gap-1 px-2 font-mono text-xs"
								>
									{set.completedAt ? (
										<span className="text-primary font-bold">{set.completedAt}</span>
									) : (
										<>
											<Clock className="size-3" />
											Finish
										</>
									)}
								</Button>
							</div>

							<Button
								variant="ghost"
								size="icon"
								onClick={() => removeSet(set.id)}
								className="text-muted-foreground hover:text-destructive size-8"
							>
								<Trash2 className="size-4" />
							</Button>
						</div>
					))}
				</div>
			</CardContent>
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
