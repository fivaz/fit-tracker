import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type Exercise = {
	id: string;
	name: string;
};

type ExerciseSelectorProps = {
	exercises: Exercise[];
	selectedExerciseId: string;
	onExerciseChange: (exerciseId: string) => void;
};

export function ExerciseSelector({
	exercises,
	selectedExerciseId,
	onExerciseChange,
}: ExerciseSelectorProps) {
	return (
		<div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
			<div className="space-y-3">
				<Label className="text-gray-600 dark:text-gray-400">Select Exercise</Label>

				<Select value={selectedExerciseId} onValueChange={onExerciseChange}>
					<SelectTrigger className="w-full rounded-xl border-gray-300 bg-gray-50 px-4 py-6 text-gray-900 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white">
						<SelectValue placeholder="Choose an exercise" />
					</SelectTrigger>
					<SelectContent>
						{exercises.map((exercise) => (
							<SelectItem key={exercise.id} value={exercise.id}>
								{exercise.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
