"use client";

import { AnimatePresence } from "motion/react";

import { ExerciseEmptyState } from "@/components/exercise/exercise-empty-state/exercise-empty-state";
import { ExerciseFormButton } from "@/components/exercise/exercise-form-button/exercise-form-button";
import { ExerciseRow } from "@/components/exercise/exercise-row/exercise-row";
import { ExercisesProvider, useExercises } from "@/lib/exercise/exercises-context";
import { ExerciseWithPrograms } from "@/lib/exercise/types";

type ProgramDetailContentProps = {
	initialExercises: ExerciseWithPrograms[];
	programId: string;
};

/**
 * Render a program's exercise list wrapped in an ExercisesProvider and an add-exercise button.
 *
 * @param initialExercises - Initial exercises to populate the provider's state
 * @param programId - Identifier of the program used by the add-exercise button
 * @returns The React element that renders the provider-wrapped exercise list and form button
 */
export function ProgramExerciseList({ initialExercises, programId }: ProgramDetailContentProps) {
	return (
		<ExercisesProvider initialItems={initialExercises}>
			<div className="space-y-4">
				<ExerciseFormButton programId={programId} />
				<ExerciseListInternal />
			</div>
		</ExercisesProvider>
	);
}

/**
 * Render the current exercises from context, showing an empty state when no exercises exist.
 *
 * @returns A React element that is either an ExerciseEmptyState or a container with ExerciseRow items wrapped in AnimatePresence for animated layout transitions.
 */
function ExerciseListInternal() {
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