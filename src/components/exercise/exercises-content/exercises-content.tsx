import { AnimatePresence } from "motion/react";

import { ExerciseEmptyState } from "@/components/exercise/exercise-empty-state/exercise-empty-state";
import { ExerciseRow } from "@/components/exercise/exercise-row/exercise-row";
import { getExercises } from "@/lib/exercise/action";
import { devDelay } from "@/lib/utils";

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
