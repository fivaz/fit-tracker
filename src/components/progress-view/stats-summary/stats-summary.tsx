import { StatCard } from "../stat-card/stat-card";

type ProgressData = {
	date: string;
	maxWeight: number;
	totalReps: number;
	volume: number;
};

type StatsSummaryProps = {
	latestData: ProgressData;
	workoutCount: number;
};

export function StatsSummary({ latestData, workoutCount }: StatsSummaryProps) {
	return (
		<div className="grid grid-cols-2 gap-3">
			<StatCard
				label="Max Weight"
				value={`${latestData.maxWeight} kg`}
				gradient="from-blue-500 to-blue-600"
			/>
			<StatCard label="Workouts" value={workoutCount} gradient="from-green-500 to-green-600" />
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
	);
}
