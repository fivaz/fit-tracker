"use client";

import { startTransition } from "react";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TimeButton } from "@/components/workout/time-button/time-button";
import { useConfirm } from "@/lib/hooks/use-confirm";
import { deleteSetAction, updateSetAction } from "@/lib/set-logs/actions";
import { useSetLogs } from "@/lib/set-logs/set-logs-context";
import { SetLogUI } from "@/lib/set-logs/types";

type WorkoutSetRowProps = {
	index: number;
	set: SetLogUI;
	sessionId: string;
};

export function WorkoutSetRow({ index, set, sessionId }: WorkoutSetRowProps) {
	const confirm = useConfirm();
	const { updateItem, deleteItem } = useSetLogs();

	const persistUpdate = (updatedSet: SetLogUI) => {
		startTransition(async () => {
			updateItem(updatedSet);
			await updateSetAction(set.id, sessionId, updatedSet);
		});
	};

	const handleWeightBlur = (value: string) => {
		const numeric = parseFloat(value);
		const final = isNaN(numeric) ? 0 : numeric;
		if (final !== set.weight) {
			persistUpdate({ ...set, weight: final });
		}
	};

	const handleRepsBlur = (value: string) => {
		const numeric = parseInt(value, 10);
		const final = isNaN(numeric) ? 0 : numeric;
		if (final !== set.reps) {
			persistUpdate({ ...set, reps: final });
		}
	};

	const handleTimeChange = (newDate: Date | null) => {
		persistUpdate({ ...set, completedAt: newDate });
	};

	const handleDelete = async () => {
		if (set.reps || set.weight || set.completedAt) {
			const confirmed = await confirm({ title: "Delete set", message: "Are you sure?" });
			if (!confirmed) return;
		}

		startTransition(async () => {
			deleteItem(set.id);
			await deleteSetAction(set.id, sessionId);
		});
	};

	return (
		<div className="group animate-in fade-in slide-in-from-left-2 flex items-center gap-2">
			<div className="text-muted-foreground w-6 flex-none text-xs font-bold">{index + 1}</div>

			<div className="grid flex-1 grid-cols-3 gap-2">
				<Input
					type="number"
					placeholder="kg"
					defaultValue={set.weight === 0 ? "" : set.weight}
					onBlur={(e) => handleWeightBlur(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
					className="h-9 text-center tabular-nums"
				/>
				<Input
					type="number"
					placeholder="reps"
					defaultValue={set.reps === 0 ? "" : set.reps}
					onBlur={(e) => handleRepsBlur(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
					className="h-9 text-center tabular-nums"
				/>
				<TimeButton time={set.completedAt} onChange={handleTimeChange} />
			</div>

			<Button
				variant="ghost"
				size="icon"
				onClick={handleDelete}
				className="text-muted-foreground hover:text-destructive size-8"
			>
				<Trash2 className="size-4" />
			</Button>
		</div>
	);
}
