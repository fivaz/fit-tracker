import { Suspense } from "react";

import { ExercisesList } from "@/components/exercise/exercises-list/exercises-list";
import { ExercisesSkeleton } from "@/components/exercise/exercises-skeleton/exercises-skeleton";
import { getExercises, getExercisesWithPrograms } from "@/lib/exercise/actions";

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

async function ExercisesCount() {
	const { getExercisesCount } = await import("@/lib/exercise/actions");
	const count = await getExercisesCount();

	return (
		<p className="text-primary text-sm">
			{count} exercise{count !== 1 && "s"}
		</p>
	);
}

async function ExercisesContent() {
	const exercises = await getExercisesWithPrograms();

	return <ExercisesList initialExercises={exercises} />;
}
