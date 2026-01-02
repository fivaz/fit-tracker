"use client";

import { useState } from "react";

import { Plus } from "lucide-react";
import { AnimatePresence } from "motion/react";

import { ExerciseForm } from "@/components/exercise/exercise-form-button/exercise-form/exercise-form";
import { Button } from "@/components/ui/button";
import { buildEmptyExercise } from "@/lib/exercise/types";

type ExerciseFormButtonProps = {
	programId?: string;
};

/**
 * Renders a button that opens a form to create a new exercise.
 *
 * When closed this displays a full-width "New Exercise" button; when opened it renders
 * an ExerciseForm initialized with a freshly built empty exercise.
 *
 * @param programId - Optional program ID to associate the new exercise with; if provided the empty exercise will include that program reference.
 * @returns The rendered JSX element for the exercise-creation UI (button or form).
 */
export function ExerciseFormButton({ programId }: ExerciseFormButtonProps) {
	const [open, setOpen] = useState(false);

	const emptyExercise = buildEmptyExercise(programId ? { programs: [{ programId }] } : {});

	return (
		<div>
			{!open ? (
				<Button onClick={() => setOpen(true)} className="w-full">
					<Plus className="mr-2 size-5" /> New Exercise
				</Button>
			) : (
				<AnimatePresence mode="wait">
					<ExerciseForm
						exercise={emptyExercise}
						programId={programId}
						onClose={() => setOpen(false)}
					/>
				</AnimatePresence>
			)}
		</div>
	);
}