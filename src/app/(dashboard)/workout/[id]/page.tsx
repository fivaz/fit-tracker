import { redirect } from "next/navigation";

import { WorkoutExercise } from "@/components/workout/workout-exercise/workout-exercise";
import { WorkoutHeader } from "@/components/workout/workout-header/workout-header";
import { ROUTES } from "@/lib/consts";
import { getWorkoutSessionById } from "@/lib/workout/actions";

type WorkoutPageProps = {
	params: Promise<{ id: string }>;
};

/**
 * Render the workout session page for a given session ID.
 *
 * Retrieves the workout session for the provided route `id` and renders a header and list of exercises.
 * If no session is found, the request is redirected to the home route.
 *
 * @param params - A promise resolving to route parameters; must include `id` for the workout session
 * @returns The React element for the workout session page
 */
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