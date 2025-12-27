import { Header } from "@/components/home/header/header";
import { StartWorkout } from "@/components/home/start-workout/start-workout";
import { QuickActions } from "@/components/home/quick-actions/quick-actions";

export default function Home() {
	// Mock Data
	const exercises = [
		{ id: "1", name: "Bench Press" },
		{ id: "2", name: "Squat" },
	];

	const workoutSessions = [{ completed: true }, { completed: true }];

	return (
		<div className="mx-auto max-w-md">
			<div className="space-y-4 p-4">
				<Header />

				<StartWorkout />

				{/* Stats Grid */}
				<div className="grid grid-cols-2 gap-3">
					<div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
						<div className="mb-1 text-2xl">{workoutSessions.filter((s) => s.completed).length}</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">Workouts</div>
					</div>
					<div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
						<div className="mb-1 text-2xl">{exercises.length}</div>
						<div className="text-gray-600 dark:text-gray-400">Exercises</div>
					</div>
				</div>

				<QuickActions />
			</div>
		</div>
	);
}
