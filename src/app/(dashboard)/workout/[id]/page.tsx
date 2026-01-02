import { redirect } from "next/navigation";

import { WorkoutExercise } from "@/components/workout/workout-exercise/workout-exercise";
import { WorkoutHeader } from "@/components/workout/workout-header/workout-header";
import { ROUTES } from "@/lib/consts";
import { getWorkoutSessionById } from "@/lib/workout/actions";

type WorkoutPageProps = {
	params: Promise<{ id: string }>;
};

export default async function WorkoutPage({ params }: WorkoutPageProps) {
	const { id } = await params;
	const workoutSession = await getWorkoutSessionById(id);

	if (!workoutSession) redirect(ROUTES.HOME);

	return (
		<div className="bg-background flex min-h-screen flex-col pb-32">
			<WorkoutHeader
				sessionId={workoutSession.id}
				startedAt={workoutSession.startedAt}
				programName={workoutSession.programName}
			/>

			<div className="mt-6 space-y-4 px-4">
				{workoutSession.exercises.map((item) => (
					<WorkoutExercise key={item.id} exercise={item} sessionId={workoutSession.id} />
				))}
			</div>
		</div>
	);
}
