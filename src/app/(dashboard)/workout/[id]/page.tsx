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
	const session = await getWorkoutSession(id);

	if (!session) redirect(ROUTES.HOME);

	return (
		<div className="bg-background flex min-h-screen flex-col pb-32">
			<WorkoutHeader
				sessionId={session.id}
				startedAt={session.startedAt}
				programName={session.program.name}
			/>

			<main className="mt-6 space-y-4 px-4">
				<h2 className="px-1 text-lg font-semibold">Exercise List</h2>

				{session.program.exercises.map((item) => (
					<WorkoutExercise key={item.exerciseId} exercise={item.exercise} />
				))}
			</main>
		</div>
	);
}
