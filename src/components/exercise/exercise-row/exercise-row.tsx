"use client";
import { useState } from "react";
import Link from "next/link";

import { ChevronRight, Dumbbell, Pencil, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { ConfirmDialog } from "@/components/confirm-dialog/confirm-dialog";
import { deleteExerciseAction } from "@/components/exercise/action";
import { ExerciseForm } from "@/components/exercise/exercise-form-button/exercise-form/exercise-form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Exercise } from "@/generated/prisma/client";
import { ROUTES } from "@/lib/consts";

type ExerciseRowProps = {
	exercise: Exercise;
};

export function ExerciseRow({ exercise }: ExerciseRowProps) {
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
					<ExerciseForm key="edit-form" exercise={exercise} onClose={() => setIsEditing(false)} />
				) : (
					<motion.div
						key="display-row"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, x: -100 }}
					>
						<Card>
							<CardHeader className="flex items-center justify-between">
								<h2>{exercise.name}</h2>
								<CardAction className="space-x-2">
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
								</CardAction>
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
