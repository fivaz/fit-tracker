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
import { MuscleGroup } from "@/generated/prisma/client";
import { saveExercise } from "@/lib/exercise/action";
import { parseExerciseFormData } from "@/lib/exercise/exercise-form-data";
import { useExercises } from "@/lib/exercise/exercises-context";
import { ExerciseWithPrograms } from "@/lib/exercise/types";
import { reportError } from "@/lib/logger";

type ExerciseFormProps = {
	exercise: ExerciseWithPrograms;
	onClose: () => void;
	programId?: string;
};

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

		const optimisticExercise: ExerciseWithPrograms = {
			id: id || crypto.randomUUID(),
			image: imageFile ? URL.createObjectURL(imageFile) : null,
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
			} catch (err: unknown) {
				if (isEdit && exercise.id) {
					// Revert to previous state
					updateItem(exercise);
				} else {
					// Remove the optimistically added exercise
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
								/>
							</Field>

							<Field>
								<MuscleSelect name="muscles" defaultValue={exercise.muscles} />
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
