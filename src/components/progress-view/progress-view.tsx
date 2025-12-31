"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Calendar, ChevronLeft, Dumbbell, TrendingUp } from "lucide-react";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

type Exercise = {
	id: string;
	name: string;
};

type SetLog = {
	id: string;
	weight: number;
	reps: number;
	completedAt: Date | null;
	exerciseId: string;
};

type WorkoutSession = {
	id: string;
	startedAt: Date;
	completedAt: Date | null;
	setLogs: SetLog[];
};

type ProgressData = {
	date: string;
	maxWeight: number;
	totalReps: number;
	volume: number;
};

// Sub-components
function StatCard({
	label,
	value,
	gradient,
}: {
	label: string;
	value: string | number;
	gradient: string;
}) {
	return (
		<div className={`bg-linear-to-br ${gradient} rounded-2xl p-4 shadow-lg`}>
			<div className="mb-1 text-sm text-white/80">{label}</div>
			<div className="text-2xl font-bold text-white">{value}</div>
		</div>
	);
}

function ProgressChart({
	data,
	dataKey,
	title,
	color,
	unit,
}: {
	data: ProgressData[];
	dataKey: keyof ProgressData;
	title: string;
	color: string;
	unit: string;
}) {
	return (
		<div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
			<h3 className="mb-4 flex items-center gap-2 font-semibold">
				<TrendingUp className="h-5 w-5" style={{ color }} />
				{title}
			</h3>
			<div style={{ width: "100%", height: "256px" }}>
				<ResponsiveContainer>
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
						<XAxis
							dataKey="date"
							className="fill-gray-600 dark:fill-gray-400"
							style={{ fontSize: "12px" }}
						/>
						<YAxis className="fill-gray-600 dark:fill-gray-400" style={{ fontSize: "12px" }} />
						<Tooltip
							contentStyle={{
								backgroundColor: "var(--tooltip-bg)",
								border: "1px solid var(--tooltip-border)",
								borderRadius: "8px",
								color: "var(--tooltip-text)",
							}}
						/>
						<Line
							type="monotone"
							dataKey={dataKey}
							stroke={color}
							strokeWidth={3}
							name={`${title} ${unit}`}
							dot={{ fill: color, strokeWidth: 2, r: 4 }}
							activeDot={{ r: 6 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

function EmptyState({
	icon: Icon,
	title,
	subtitle,
}: {
	icon: any;
	title: string;
	subtitle: string;
}) {
	return (
		<div className="py-16 text-center">
			<Icon className="mx-auto mb-3 h-12 w-12 text-gray-300 dark:text-gray-700" />
			<p className="font-medium text-gray-600 dark:text-gray-400">{title}</p>
			<p className="mt-1 text-sm text-gray-500 dark:text-gray-600">{subtitle}</p>
		</div>
	);
}

// Custom hook for processing exercise data
function useExerciseProgress(sessions: WorkoutSession[], exerciseId: string) {
	return useMemo(() => {
		if (!exerciseId) return [];

		const completedSessions = sessions
			.filter((s) => s.completedAt)
			.sort((a, b) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime());

		const progressData: ProgressData[] = [];

		completedSessions.forEach((session) => {
			const exerciseSets = session.setLogs.filter((log) => log.exerciseId === exerciseId);
			if (exerciseSets.length === 0) return;

			const maxWeight = Math.max(...exerciseSets.map((s) => s.weight));
			const totalReps = exerciseSets.reduce((sum, s) => sum + s.reps, 0);
			const volume = exerciseSets.reduce((sum, s) => sum + s.weight * s.reps, 0);

			progressData.push({
				date: new Date(session.startedAt).toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
				}),
				maxWeight,
				totalReps,
				volume: Math.round(volume),
			});
		});

		return progressData;
	}, [sessions, exerciseId]);
}

// Main component
type ProgressViewProps = {
	exercises: Exercise[];
	sessions: WorkoutSession[];
};

export function ProgressView({ exercises, sessions }: ProgressViewProps) {
	const router = useRouter();
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
			{/* Header */}
			<div className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
				<div className="flex items-center gap-3 p-4">
					<button
						onClick={() => router.back()}
						className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
					>
						<ChevronLeft className="h-6 w-6" />
					</button>
					<div>
						<h2 className="text-lg font-semibold">Progress Tracking</h2>
						<p className="text-sm text-gray-600 dark:text-gray-400">View your fitness journey</p>
					</div>
				</div>
			</div>

			<div className="space-y-4 p-4">
				{/* Exercise Selector */}
				<div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
					<label className="mb-3 block text-sm font-medium text-gray-600 dark:text-gray-400">
						Select Exercise
					</label>
					<select
						value={selectedExerciseId}
						onChange={(e) => setSelectedExerciseId(e.target.value)}
						className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-white"
					>
						<option value="">-- Choose an exercise --</option>
						{exercisesWithData.map((exercise) => (
							<option key={exercise.id} value={exercise.id}>
								{exercise.name}
							</option>
						))}
					</select>
				</div>

				{/* Stats and Charts */}
				{selectedExercise && progressData.length > 0 && (
					<div className="space-y-4">
						{/* Summary Stats */}
						<div className="grid grid-cols-2 gap-3">
							<StatCard
								label="Max Weight"
								value={`${latestData.maxWeight} kg`}
								gradient="from-blue-500 to-blue-600"
							/>
							<StatCard
								label="Workouts"
								value={progressData.length}
								gradient="from-green-500 to-green-600"
							/>
							<StatCard
								label="Total Reps"
								value={latestData.totalReps}
								gradient="from-orange-500 to-orange-600"
							/>
							<StatCard
								label="Volume"
								value={`${latestData.volume} kg`}
								gradient="from-purple-500 to-purple-600"
							/>
						</div>

						{/* Charts */}
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
