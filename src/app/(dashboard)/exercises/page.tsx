import { Suspense } from "react";

import { ExercisesList } from "@/components/exercise/exercises-list/exercises-list";
import { ExercisesSkeleton } from "@/components/exercise/exercises-skeleton/exercises-skeleton";
import { getExercises } from "@/lib/exercise/actions";

/**
 * Render the Exercises page containing a header, an asynchronously loaded exercises count, and the exercises list area.
 *
 * @returns The JSX element for the Exercises page layout with Suspense fallbacks for the count and content sections.
 */
export default function ExercisesPage() {
	return (
		<div className="space-y-4 p-4">
			<div className="pt-2 pb-2">
				<h1 className="mb-1 text-xl tracking-tight">Workout Exercises</h1>
				<Suspense fallback={<div className="text-primary text-sm">Loading...</div>}>
					<ExercisesCount />
				</Suspense>
			</div>

			<Suspense fallback={<ExercisesSkeleton />}>
				<ExercisesContent />
			</Suspense>
		</div>
	);
}

/**
 * Displays the total number of exercises with correct pluralization.
 *
 * @returns A JSX paragraph element containing the exercise count followed by "exercise" or "exercises".
 */
async function ExercisesCount() {
	const { getExercisesCount } = await import("@/lib/exercise/actions");
	const count = await getExercisesCount();

	return (
		<p className="text-primary text-sm">
			{count} exercise{count !== 1 && "s"}
		</p>
	);
}

/**
 * Renders the exercises list populated with the current exercises.
 *
 * @returns A JSX element that renders `ExercisesList` initialized with the retrieved exercises.
 */
async function ExercisesContent() {
	const exercises = await getExercises();

	return <ExercisesList initialExercises={exercises} />;
}