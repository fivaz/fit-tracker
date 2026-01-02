"use client";

import { AnimatePresence } from "motion/react";

import { ExerciseEmptyState } from "@/components/exercise/exercise-empty-state/exercise-empty-state";
import { ExerciseFormButton } from "@/components/exercise/exercise-form-button/exercise-form-button";
import { ExerciseRow } from "@/components/exercise/exercise-row/exercise-row";
import { ExercisesProvider, ExerciseSummary, useExercises } from "@/lib/exercise/exercises-context";

type ExercisesListProps = {
	initialExercises: ExerciseSummary[];
};

export function ExercisesList({ initialExercises }: ExercisesListProps) {
	return (
		<ExercisesProvider initialItems={initialExercises}>
			<div className="space-y-4">
				<ExerciseFormButton />
				<ExercisesListInternal />
			</div>
		</ExercisesProvider>
	);
}

function ExercisesListInternal() {
	const { items: exercises } = useExercises();

	if (exercises.length === 0) {
		return <ExerciseEmptyState />;
	}

	return (
		<div className="space-y-2">
			<AnimatePresence mode="popLayout">
				{exercises.map((exercise) => (
					<ExerciseRow key={exercise.id} exercise={exercise} />
				))}
			</AnimatePresence>
		</div>
	);
}
