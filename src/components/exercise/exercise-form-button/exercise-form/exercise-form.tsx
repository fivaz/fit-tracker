import { X } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Exercise } from "@/generated/prisma/client";
import { MAJOR_MUSCLE_GROUPS } from "@/lib/consts";

import { saveExercise } from "../../action";

type ExerciseFormProps = {
	exercise: Partial<Exercise>;
	onClose: () => void;
};

export function ExerciseForm({ exercise, onClose }: ExerciseFormProps) {
	const isEdit = exercise.id;

	return (
		<motion.form
			initial={{ opacity: 0, height: 0, scale: 0.95 }}
			animate={{ opacity: 1, height: "auto", scale: 1 }}
			exit={{ opacity: 0, height: 0, scale: 0.95 }}
			transition={{ duration: 0.2 }}
			action={async (formData) => {
				await saveExercise(formData);
				onClose();
			}}
		>
			<Card>
				<CardHeader>
					<CardTitle>{isEdit ? "Edit Exercise" : "New Exercise"}</CardTitle>
					<CardAction>
						<Button type="button" onClick={onClose} variant="outline" size="icon">
							<X className="size-5" />
						</Button>
					</CardAction>
				</CardHeader>

				{isEdit && <input type="hidden" name="id" value={exercise.id} />}
				<input type="hidden" name="programId" value={exercise.programId} />

				<CardContent>
					<FieldGroup>
						<FieldSet>
							<Field>
								<FieldLabel htmlFor="name">Exercise Name</FieldLabel>
								<Input
									id="name"
									name="name"
									defaultValue={exercise.name}
									required
									placeholder="e.g., Bench Press"
								/>
							</Field>

							<Field>
								<FieldLabel htmlFor="muscle">Muscle Group</FieldLabel>
								<Select name="muscle" defaultValue={exercise.muscle}>
									<SelectTrigger id="muscle">
										<SelectValue placeholder="Select a muscle" />
									</SelectTrigger>
									<SelectContent>
										{MAJOR_MUSCLE_GROUPS.map((m) => (
											<SelectItem key={m} value={m}>
												{m}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</Field>

							<Field>
								<FieldLabel htmlFor="image">Exercise Image</FieldLabel>
								<div className="flex items-center gap-4">
									{exercise.image && (
										<img
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
