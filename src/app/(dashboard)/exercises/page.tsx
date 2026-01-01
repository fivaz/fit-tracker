import { Suspense } from "react";

import { ExerciseFormButton } from "@/components/exercise/exercise-form-button/exercise-form-button";
import { ExercisesContent } from "@/components/exercise/exercises-content/exercises-content";
import { ExercisesSkeleton } from "@/components/exercise/exercises-skeleton/exercises-skeleton";

export default function ExercisesPage() {
	return (
		<div className="space-y-4 p-4">
			<div className="pt-2 pb-2">
				<h1 className="mb-1 text-xl tracking-tight">Workout Exercises</h1>
				<Suspense fallback={<div className="text-primary text-sm">Loading...</div>}>
					<ExercisesCount />
				</Suspense>
			</div>

			<ExerciseFormButton />

			<Suspense fallback={<ExercisesSkeleton />}>
				<ExercisesContent />
			</Suspense>
		</div>
	);
}

async function ExercisesCount() {
	const { getExercisesCount } = await import("@/lib/exercise/action");
	const count = await getExercisesCount();

	return (
		<p className="text-primary text-sm">
			{count} exercise{count !== 1 && "s"}
		</p>
	);
}
