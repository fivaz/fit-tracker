"use client";

import { AnimatePresence } from "motion/react";

import { ExerciseEmptyState } from "@/components/exercise/exercise-empty-state/exercise-empty-state";
import { ExerciseFormButton } from "@/components/exercise/exercise-form-button/exercise-form-button";
import { ExerciseRow } from "@/components/exercise/exercise-row/exercise-row";
import { ProgramEmptyState } from "@/components/program/program-empty-state/program-empty-state";
import { ProgramRow } from "@/components/program/program-row/program-row";
import { ExercisesProvider, useExercises } from "@/lib/exercise/exercises-context";
import { ExerciseWithPrograms } from "@/lib/exercise/types";
import { usePrograms } from "@/lib/program/programs-context";

type ProgramDetailContentProps = {
	initialExercises: ExerciseWithPrograms[];
	programId: string;
};

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
