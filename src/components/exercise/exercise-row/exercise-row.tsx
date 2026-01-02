"use client";
import { startTransition, useState } from "react";
import Image from "next/image";

import { Dumbbell, Pencil, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";

import { ExerciseForm } from "@/components/exercise/exercise-form-button/exercise-form/exercise-form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { deleteExerciseAction } from "@/lib/exercise/action";
import { useExercises } from "@/lib/exercise/exercises-context";
import { ExerciseSummary, ExerciseWithPrograms } from "@/lib/exercise/types";
import { useConfirm } from "@/lib/hooks/use-confirm";
import { reportError } from "@/lib/logger";

type ExerciseRowProps = {
	exercise: ExerciseSummary | ExerciseWithPrograms;
	programId?: string;
};

export function ExerciseRow({ exercise, programId }: ExerciseRowProps) {
	const { deleteItem, addItem } = useExercises();
	const [isEditing, setIsEditing] = useState(false);
	const confirm = useConfirm();

	const handleDelete = async () => {
		const confirmed = await confirm({
			title: "Delete Program",
			message: `Are you sure you want to delete "${exercise.name}"? This action cannot be undone.`,
		});

		if (!confirmed) return;

		const itemToRollback = { ...exercise };

		startTransition(async () => {
			deleteItem(exercise.id);

			try {
				await deleteExerciseAction(exercise.id);
				toast.success("Exercise deleted");
			} catch (error) {
				addItem(itemToRollback);

				reportError(error, { extra: { id: exercise.id, name: exercise.name } });

				toast.error("Failed to delete exercise", {
					description: "Your changes were rolled back.",
				});
			}
		});
	};

	return (
		<div className="relative">
			<AnimatePresence mode="wait">
				{isEditing ? (
					<ExerciseForm
						key="edit-form"
						programId={programId}
						exercise={exercise}
						onClose={() => setIsEditing(false)}
					/>
				) : (
					<motion.div
						key="display-row"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, x: -100 }}
					>
						<Card className="py-5">
							<CardHeader className="flex flex-row items-center gap-4 px-5">
								{/* --- Image Section --- */}
								<div className="bg-muted flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-md border">
									{exercise.image ? (
										<Image
											src={exercise.image}
											alt={exercise.name}
											height={56}
											width={56}
											className="size-full object-cover"
										/>
									) : (
										<Dumbbell className="text-muted-foreground size-6" />
									)}
								</div>

								{/* --- Title Section --- */}
								<div className="min-w-0 flex-1">
									<h2 className="truncate font-semibold">{exercise.name}</h2>
									<p className="text-muted-foreground text-xs tracking-wider capitalize">
										{exercise.muscles.slice(0, 3).join(", ")}
										{exercise.muscles.length > 3 && ` +${exercise.muscles.length - 3}`}
									</p>
								</div>

								{/* --- Actions Section --- */}
								<div className="space-x-2">
									<Button variant="outline" onClick={() => setIsEditing(true)} size="icon-sm">
										<Pencil className="size-4" />
									</Button>
									<Button
										variant="outline"
										className="text-destructive hover:text-red-500"
										size="icon-sm"
										onClick={handleDelete}
									>
										<Trash2 className="size-4" />
									</Button>
								</div>
							</CardHeader>
						</Card>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
