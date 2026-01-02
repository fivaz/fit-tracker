import { type FormEvent, startTransition, useState } from "react";
import Image from "next/image";

import { AlertCircle, X } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

import { MuscleSelect } from "@/components/muscle-select/muscle-select";
import { ProgramSelect } from "@/components/program-select/program-select";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { saveExercise } from "@/lib/exercise/actions";
import { parseExerciseFormData } from "@/lib/exercise/exercise-form-data";
import { useExercises } from "@/lib/exercise/exercises-context";
import { ExerciseWithPrograms } from "@/lib/exercise/types";
import { reportError } from "@/lib/logger";

type ExerciseFormProps = {
	exercise: ExerciseWithPrograms;
	onClose: () => void;
	programId?: string;
};

/**
 * Render a form for creating or editing an exercise and apply optimistic UI updates while saving.
 *
 * The form validates required fields (name and muscles), builds FormData (including an optional image file),
 * performs an optimistic add/update to the exercises context, and attempts to persist changes via the API.
 * On API failure it rolls back the optimistic changes, reports the error, shows a toast, and surfaces an error message.
 *
 * @param exercise - The exercise to edit or a scaffold for creating a new exercise (may include associated programs and image).
 * @param onClose - Callback invoked to close the form UI.
 * @param programId - Optional program ID used to preselect a program when creating a new exercise.
 * @returns The rendered exercise form element.
 */
export function ExerciseForm({ exercise, onClose, programId }: ExerciseFormProps) {
	const { addItem, updateItem, deleteItem } = useExercises();
	const [error, setError] = useState<string | null>(null);
	const isEdit = !!exercise.id;

	const initialProgramIds =
		exercise.programs?.map((p) => p.programId) || (programId ? [programId] : []);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);

		const formData = new FormData(e.currentTarget);
		const { id, name, muscles, programs, imageFile } = parseExerciseFormData(formData);

		if (!name || name.trim().length === 0) {
			setError("Name is required.");
			return;
		}

		if (!muscles || muscles.length === 0) {
			setError("Muscle group is required.");
			return;
		}

		const previewUrl = imageFile ? URL.createObjectURL(imageFile) : null;

		const optimisticExercise: ExerciseWithPrograms = {
			id: id || crypto.randomUUID(),
			image: previewUrl,
			name,
			muscles,
			programs,
		};

		onClose();

		startTransition(async () => {
			if (isEdit) {
				updateItem(optimisticExercise);
			} else {
				addItem(optimisticExercise);
			}

			try {
				await saveExercise(formData);
				toast.success(isEdit ? "Exercise updated" : "Exercise created");
				if (previewUrl && previewUrl.startsWith("blob:")) {
					URL.revokeObjectURL(previewUrl);
				}
			} catch (err: unknown) {
				if (previewUrl && previewUrl.startsWith("blob:")) {
					URL.revokeObjectURL(previewUrl);
				}

				if (isEdit && exercise.id) {
					updateItem(exercise);
				} else {
					deleteItem(optimisticExercise.id);
				}

				const errorMessage =
					err instanceof Error ? err.message : "Something went wrong. Please try again.";
				reportError(err, { extra: { id, name, isEdit } });
				toast.error(isEdit ? "Failed to update exercise" : "Failed to create exercise", {
					description: "Your changes were rolled back.",
				});
				setError(errorMessage);
			}
		});
	};

	return (
		<motion.form
			initial={{ opacity: 0, height: 0, scale: 0.95 }}
			animate={{ opacity: 1, height: "auto", scale: 1 }}
			exit={{ opacity: 0, height: 0, scale: 0.95 }}
			transition={{ duration: 0.2 }}
			onSubmit={handleSubmit}
		>
			<Card>
				<CardHeader className="flex items-center justify-between px-5">
					<h2>{isEdit ? "Edit Exercise" : "New Exercise"}</h2>
					<CardAction>
						<Button type="button" onClick={onClose} variant="outline" size="icon">
							<X className="size-5" />
						</Button>
					</CardAction>
				</CardHeader>

				{isEdit && <input type="hidden" name="id" value={exercise.id} />}

				<CardContent>
					<FieldGroup>
						<FieldSet>
							{error && (
								<Alert className="text-destructive bg-destructive/10">
									<AlertCircle className="size-4" />
									<AlertTitle>{error}</AlertTitle>
								</Alert>
							)}

							<Field>
								<FieldLabel htmlFor="name">Exercise Name</FieldLabel>
								<Input
									id="name"
									name="name"
									defaultValue={exercise.name}
									placeholder="e.g., Bench Press"
									required
									minLength={1}
									maxLength={255}
								/>
							</Field>

							<Field>
								<MuscleSelect name="muscles" defaultValue={exercise.muscles} required />
							</Field>

							<Field>
								<ProgramSelect name="programIds" defaultValue={initialProgramIds} />
							</Field>

							<Field>
								<FieldLabel htmlFor="image">Exercise Image</FieldLabel>
								<div className="flex items-center gap-4">
									{exercise.image && (
										<Image
											width={48}
											height={48}
											src={exercise.image}
											className="size-12 rounded-lg object-cover"
											alt="Preview"
										/>
									)}
									<Input
										id="image"
										name="image"
										type="file"
										accept="image/*"
										className="cursor-pointer"
									/>
								</div>
							</Field>
						</FieldSet>
					</FieldGroup>
				</CardContent>

				<CardFooter className="flex-col gap-2">
					<Button type="submit" className="w-full">
						{isEdit ? "Save Changes" : "Create Exercise"}
					</Button>
					<Button type="button" variant="outline" onClick={onClose} className="w-full">
						Cancel
					</Button>
				</CardFooter>
			</Card>
		</motion.form>
	);
}