import { useRef, useState } from "react";

import { Clock, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type WorkoutSetRowProps = {
	index: number;
	set: {
		id: string;
		reps: string;
		weight: string;
		completedAt: string;
	};
	onUpdate: (
		id: string,
		data: Partial<{ reps: string; weight: string; completedAt: string }>,
	) => void;
	onDelete: (id: string) => void;
};

export function WorkoutSetRow({ index, set, onUpdate, onDelete }: WorkoutSetRowProps) {
	const [isEditingTime, setIsEditingTime] = useState(false);
	const longPressTimer = useRef<NodeJS.Timeout | null>(null);

	// Handle Long Press for manual time entry
	const startPress = () => {
		longPressTimer.current = setTimeout(() => {
			setIsEditingTime(true);
		}, 600); // 600ms threshold
	};

	const endPress = () => {
		if (longPressTimer.current) clearTimeout(longPressTimer.current);
	};

	const handleDelete = () => {
		const hasData = set.reps || set.weight || set.completedAt;
		if (hasData) {
			if (!confirm("This set has data. Are you sure you want to delete it?")) return;
		}
		onDelete(set.id);
	};

	const markNow = () => {
		if (isEditingTime) return;
		const now = new Date().toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		});
		onUpdate(set.id, { completedAt: now });
	};

	return (
		<div className="group animate-in fade-in slide-in-from-left-2 flex items-center gap-2">
			<div className="text-muted-foreground w-6 flex-none text-xs font-bold">{index + 1}</div>

			<div className="grid flex-1 grid-cols-3 gap-2">
				<Input
					type="number"
					placeholder="kg"
					value={set.weight}
					onBlur={(e) => onUpdate(set.id, { weight: e.target.value })}
					onChange={(e) => onUpdate(set.id, { weight: e.target.value })}
					className="h-9 text-center tabular-nums"
				/>
				<Input
					type="number"
					placeholder="reps"
					value={set.reps}
					onBlur={(e) => onUpdate(set.id, { reps: e.target.value })}
					onChange={(e) => onUpdate(set.id, { reps: e.target.value })}
					className="h-9 text-center tabular-nums"
				/>

				{isEditingTime ? (
					<Input
						autoFocus
						className="h-9 text-center font-mono text-xs"
						value={set.completedAt}
						onBlur={() => setIsEditingTime(false)}
						onChange={(e) => onUpdate(set.id, { completedAt: e.target.value })}
					/>
				) : (
					<Button
						variant={set.completedAt ? "ghost" : "outline"}
						size="sm"
						onMouseDown={startPress}
						onMouseUp={endPress}
						onTouchStart={startPress}
						onTouchEnd={endPress}
						onClick={markNow}
						className="h-9 gap-1 px-2 font-mono text-xs select-none"
					>
						{set.completedAt ? (
							<span className="text-primary font-bold">{set.completedAt}</span>
						) : (
							<>
								<Clock className="size-3" /> Finish
							</>
						)}
					</Button>
				)}
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
