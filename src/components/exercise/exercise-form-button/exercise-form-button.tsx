"use client";

import { useState } from "react";

import { Plus } from "lucide-react";
import { AnimatePresence } from "motion/react";

import { ExerciseForm } from "@/components/exercise/exercise-form-button/exercise-form/exercise-form";
import { Button } from "@/components/ui/button";
import { ExerciseFormInput } from "@/lib/exercise/types";

type ExerciseFormButtonProps = {
	programId?: string;
};

export function ExerciseFormButton({ programId }: ExerciseFormButtonProps) {
	const [open, setOpen] = useState(false);

	const emptyExercise: ExerciseFormInput = {
		name: "Test ",
	};

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
