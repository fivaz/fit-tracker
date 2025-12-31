import { redirect } from "next/navigation";

import { WorkoutExercise } from "@/components/workout-exercise/workout-exercise";
import { WorkoutHeader } from "@/components/workout-header/workout-header";
import { ROUTES } from "@/lib/consts";
import { getWorkoutSession } from "@/lib/workout/action";

type WorkoutPageProps = {
	params: Promise<{ id: string }>;
};

export default async function WorkoutPage({ params }: WorkoutPageProps) {
	const { id } = await params;
	const workout = await getWorkoutSession(id);

	if (!workout) redirect(ROUTES.HOME);

	return (
		<div className="bg-background flex min-h-screen flex-col pb-32">
			<WorkoutHeader
				sessionId={workout.sessionId}
				startedAt={workout.startedAt}
				programName={workout.programName}
			/>

			<main className="mt-6 space-y-4 px-4">
				<h2 className="px-1 text-lg font-semibold">Exercise List</h2>

				{workout.exercises.map((item) => (
					<WorkoutExercise key={item.id} exercise={item} sessionId={workout.sessionId} />
				))}
			</main>
		</div>
	);
}
