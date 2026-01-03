"use client";

import { useState } from "react";

import { Calendar, Dumbbell, TrendingUp } from "lucide-react";

import { ProgressWorkoutSession } from "@/lib/workout/type";

import { EmptyState } from "./empty-state/empty-state";
import { ExerciseSelector } from "./exercise-selector/exercise-selector";
import { ProgressChart } from "./progress-chart/progress-chart";
import { ProgressHeader } from "./progress-header/progress-header";
import { StatsSummary } from "./stats-summary/stats-summary";
import { useExerciseProgress } from "./use-exercise-progress";

type Exercise = {
	id: string;
	name: string;
};

type ProgressViewProps = {
	exercises: Exercise[];
	sessions: ProgressWorkoutSession[];
};

export function ProgressView({ exercises, sessions }: ProgressViewProps) {
	const [selectedExerciseId, setSelectedExerciseId] = useState("");

	const progressData = useExerciseProgress(sessions, selectedExerciseId);
	const selectedExercise = exercises.find((e) => e.id === selectedExerciseId);

	// Get exercises that have been performed
	const exercisesWithData = exercises.filter((exercise) =>
		sessions.some((session) => session.setLogs.some((log) => log.exerciseId === exercise.id)),
	);

	const latestData = progressData[progressData.length - 1];

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-950">
			<ProgressHeader />

			<div className="space-y-4 p-4">
				{/* Exercise Selector */}
				<ExerciseSelector
					exercises={exercisesWithData}
					selectedExerciseId={selectedExerciseId}
					onExerciseChange={setSelectedExerciseId}
				/>

				{/* Stats and Charts */}
				{selectedExercise && progressData.length > 0 && (
					<div className="space-y-4">
						<StatsSummary latestData={latestData!} workoutCount={progressData.length} />

						<ProgressChart
							data={progressData}
							dataKey="maxWeight"
							title="Max Weight Progress"
							color="#3b82f6"
							unit="(kg)"
						/>
						<ProgressChart
							data={progressData}
							dataKey="volume"
							title="Total Volume Progress"
							color="#10b981"
							unit="(kg)"
						/>
						<ProgressChart
							data={progressData}
							dataKey="totalReps"
							title="Total Reps Progress"
							color="#f59e0b"
							unit=""
						/>
					</div>
				)}

				{/* Empty States */}
				{selectedExercise && progressData.length === 0 && (
					<EmptyState
						icon={Dumbbell}
						title="No workout data yet"
						subtitle="Complete workouts to see your progress"
					/>
				)}

				{!selectedExercise && exercisesWithData.length > 0 && (
					<EmptyState
						icon={TrendingUp}
						title="Select an exercise"
						subtitle="View your progress over time"
					/>
				)}

				{exercisesWithData.length === 0 && (
					<EmptyState
						icon={Calendar}
						title="No workout history yet"
						subtitle="Complete workouts to track progress"
					/>
				)}
			</div>
		</div>
	);
}
