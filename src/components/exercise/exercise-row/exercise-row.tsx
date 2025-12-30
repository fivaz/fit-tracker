"use client";
import { useState } from "react";
import Image from "next/image";

import { Dumbbell, Pencil, Trash2 } from "lucide-react"; // Added Dumbbell as fallback
import { AnimatePresence, motion } from "motion/react";

import { ConfirmDialog } from "@/components/confirm-dialog/confirm-dialog";
import { ExerciseForm } from "@/components/exercise/exercise-form-button/exercise-form/exercise-form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Exercise } from "@/generated/prisma/client";
import { deleteExerciseAction } from "@/lib/exercise/action";

type ExerciseRowProps = {
	exercise: Exercise & { programs?: { programId: string }[] };
	programId?: string;
};

export function ExerciseRow({ exercise, programId }: ExerciseRowProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	const handleDelete = async () => {
		try {
			await deleteExerciseAction(exercise.id);
			setShowDeleteDialog(false);
		} catch (error) {
			console.error("Failed to delete exercise:", error);
		}
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
									<Button
										variant="outline"
										onClick={() => setIsEditing(true)}
										className="text-chart-2 hover:text-chart-3"
										size="icon-sm"
									>
										<Pencil className="size-4" />
									</Button>
									<Button
										variant="outline"
										className="text-destructive hover:text-red-500"
										size="icon-sm"
										onClick={() => setShowDeleteDialog(true)}
									>
										<Trash2 className="size-4" />
									</Button>
								</div>
							</CardHeader>
						</Card>
					</motion.div>
				)}
			</AnimatePresence>

			<ConfirmDialog
				isOpen={showDeleteDialog}
				title="Delete Exercise"
				message={`Are you sure you want to delete "${exercise.name}"? This action cannot be undone.`}
				onConfirm={handleDelete}
				onCancel={() => setShowDeleteDialog(false)}
			/>
		</div>
	);
}
