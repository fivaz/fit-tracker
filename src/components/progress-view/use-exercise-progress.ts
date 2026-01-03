import { useMemo } from "react";

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

export function useExerciseProgress(sessions: WorkoutSession[], exerciseId: string) {
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
