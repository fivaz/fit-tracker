import { useState } from "react";
import Image from "next/image";

import { AlertCircle, X } from "lucide-react";
import { motion } from "motion/react";

import { MuscleSelect } from "@/components/muscle-select/muscle-select";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Exercise } from "@/generated/prisma/client";
import { saveExercise } from "@/lib/exercise/action";

type ExerciseFormProps = {
	exercise: Partial<Exercise>;
	onClose: () => void;
	programId?: string;
};

export function ExerciseForm({ exercise, onClose, programId }: ExerciseFormProps) {
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);
	const isEdit = !!exercise.id;

	const handleSubmit = async (formData: FormData) => {
		setError(null);
		setIsPending(true);

		try {
			await saveExercise(formData);
			onClose();
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
		} finally {
			setIsPending(false);
		}
	};

	return (
		<motion.form
			initial={{ opacity: 0, height: 0, scale: 0.95 }}
			animate={{ opacity: 1, height: "auto", scale: 1 }}
			exit={{ opacity: 0, height: 0, scale: 0.95 }}
			transition={{ duration: 0.2 }}
			action={handleSubmit}
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
				{programId && <input type="hidden" name="programId" value={programId} />}

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
					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending && <Spinner />}
						{isEdit ? "Save Changes" : "Create Exercise"}
					</Button>
					<Button
						type="button"
						variant="outline"
						onClick={onClose}
						className="w-full"
						disabled={isPending}
					>
						Cancel
					</Button>
				</CardFooter>
			</Card>
		</motion.form>
	);
}
