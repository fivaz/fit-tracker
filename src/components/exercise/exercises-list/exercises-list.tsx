"use client";

import { AnimatePresence } from "motion/react";

import { ExerciseEmptyState } from "@/components/exercise/exercise-empty-state/exercise-empty-state";
import { ExerciseFormButton } from "@/components/exercise/exercise-form-button/exercise-form-button";
import { ExerciseRow } from "@/components/exercise/exercise-row/exercise-row";
import { ExercisesProvider, useExercises } from "@/lib/exercise/exercises-context";
import { ExerciseWithPrograms } from "@/lib/exercise/types";

type ExercisesListProps = {
	initialExercises: ExerciseWithPrograms[];
};

/**
 * Render the exercises list UI and provide it with initial exercise data.
 *
 * @param initialExercises - Initial array of exercises (each may include associated programs) used to populate the exercises context
 * @returns The rendered exercises list element
 */
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

/**
 * Renders the current exercises from context, showing an empty state when none exist.
 *
 * @returns The JSX element: an ExerciseEmptyState when there are no exercises, otherwise a container with an AnimatePresence-wrapped list of ExerciseRow components for each exercise.
 */
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