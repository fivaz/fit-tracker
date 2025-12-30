import { AnimatePresence } from "motion/react";

import { getExercises } from "@/components/exercise/action";
import { ExerciseEmptyState } from "@/components/exercise/exercise-empty-state/exercise-empty-state";
import { ExerciseFormButton } from "@/components/exercise/exercise-form-button/exercise-form-button";
import { ExerciseRow } from "@/components/exercise/exercise-row/exercise-row";

export default async function ExercisesPage() {
	const exercises = await getExercises();

	return (
		<div className="space-y-4 p-4">
			<div className="pt-2 pb-2">
				<h1 className="mb-1 text-xl tracking-tight">Workout Exercises</h1>
				<p className="text-primary text-sm">{exercises.length} exercises</p>
			</div>

			<ExerciseFormButton />

			<div className="space-y-2">
				<AnimatePresence mode="popLayout">
					{exercises.map((exercise) => (
						<ExerciseRow key={exercise.id} exercise={exercise} />
					))}
				</AnimatePresence>
			</div>

			{exercises.length === 0 && <ExerciseEmptyState />}
		</div>
	);
}
