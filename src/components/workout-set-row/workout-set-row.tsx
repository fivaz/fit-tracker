import { Trash2 } from "lucide-react";

import { TimeButton } from "@/components/time-button/time-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type WorkoutSet = {
	id: string;
	reps: string;
	weight: string;
	completedAt: Date | null;
};

type WorkoutSetRowProps = {
	index: number;
	set: WorkoutSet;
	onUpdate: (id: string, data: Partial<Omit<WorkoutSet, "id">>) => void;
	onDelete: (id: string) => void;
};

export function WorkoutSetRow({ index, set, onUpdate, onDelete }: WorkoutSetRowProps) {
	const handleDelete = () => {
		const hasData = set.reps || set.weight || set.completedAt;
		if (hasData && !confirm("This set has data. Are you sure you want to delete it?")) {
			return;
		}
		onDelete(set.id);
	};

	const updateField = (field: keyof Omit<WorkoutSet, "id">) => (value: string | Date) => {
		onUpdate(set.id, { [field]: value });
	};

	return (
		<div className="group animate-in fade-in slide-in-from-left-2 flex items-center gap-2">
			<div className="text-muted-foreground w-6 flex-none text-xs font-bold">{index + 1}</div>

			<div className="grid flex-1 grid-cols-3 gap-2">
				<Input
					type="number"
					placeholder="kg"
					value={set.weight}
					onChange={(e) => updateField("weight")(e.target.value)}
					className="h-9 text-center tabular-nums"
				/>
				<Input
					type="number"
					placeholder="reps"
					value={set.reps}
					onChange={(e) => updateField("reps")(e.target.value)}
					className="h-9 text-center tabular-nums"
				/>
				<TimeButton time={set.completedAt} onTimeChange={updateField("completedAt")} />
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
