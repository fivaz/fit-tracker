import { AnimatePresence } from "motion/react";

import { ExerciseEmptyState } from "@/components/exercise/exercise-empty-state/exercise-empty-state";
import { ExerciseRow } from "@/components/exercise/exercise-row/exercise-row";
import { getExercises } from "@/lib/exercise/actions";

/**
 * Render a list of exercises or an empty state if no exercises are available.
 *
 * Fetches exercises via `getExercises()` and, if the result is empty, renders `ExerciseEmptyState`; otherwise renders a vertically spaced container with `ExerciseRow` items wrapped in `AnimatePresence`.
 *
 * @returns A React element that is either an `ExerciseEmptyState` or a container of `ExerciseRow` components wrapped in `AnimatePresence`.
 */
export async function ExercisesContent() {
	const exercises = await getExercises();

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