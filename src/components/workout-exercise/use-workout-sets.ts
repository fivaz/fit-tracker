import { useCallback, useState } from "react";

import { toast } from "sonner";

import { SetLog } from "@/generated/prisma/client";
import { createSetAction, deleteSetAction, updateSetAction } from "@/lib/setlogs/action";

export type SetEntry = {
	id: string;
	reps: string;
	weight: string;
	completedAt: Date | null;
};

function mapLogsToEntries(logs: SetLog[]): SetEntry[] {
	return logs.map((log) => ({
		id: log.id,
		reps: String(log.reps ?? ""),
		weight: String(log.weight ?? ""),
		completedAt: log.completedAt,
	}));
}

export function useWorkoutSets(initialLogs: SetLog[], exerciseId: string, sessionId: string) {
	const [sets, setSets] = useState<SetEntry[]>(() => mapLogsToEntries(initialLogs));

	const addSet = useCallback(async () => {
		const nextOrder = sets.length;
		try {
			const newDbSet = await createSetAction(exerciseId, sessionId, nextOrder);
			const formatted = {
				id: newDbSet.id,
				reps: String(newDbSet.reps || ""),
				weight: String(newDbSet.weight || ""),
				completedAt: newDbSet.completedAt ?? null,
			};
			setSets((prev) => [...prev, formatted]);
		} catch (error) {
			console.error("Failed to create set:", error);
			toast.error("Could not create set. Check your connection.");
		}
	}, [exerciseId, sessionId, sets.length]);

	const updateSet = useCallback(
		async (id: string, data: Partial<SetEntry>) => {
			const previous = [...sets];
			setSets((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
			try {
				await updateSetAction(id, {
					reps: data.reps ? parseInt(data.reps) : undefined,
					weight: data.weight ? parseFloat(data.weight) : undefined,
					completedAt: data.completedAt ?? undefined,
				});
			} catch (error) {
				console.error("Failed to sync set:", error);
				setSets(previous);
				toast.error("Connection lost. Changes were not saved.");
			}
		},
		[sets],
	);

	const deleteSet = useCallback(
		async (id: string) => {
			const previous = [...sets];
			setSets((prev) => prev.filter((s) => s.id !== id));
			try {
				await deleteSetAction(id);
			} catch (error) {
				console.error("Failed to delete set:", error);
				setSets(previous);
				toast.error("Could not delete set. Check your connection.");
			}
		},
		[sets],
	);

	return { sets, addSet, updateSet, deleteSet, setSets };
}
