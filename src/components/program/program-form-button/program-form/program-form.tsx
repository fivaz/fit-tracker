import { useState, useTransition } from "react";

import { AlertCircle, X } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { reportError } from "@/lib/logger";
import { saveProgram } from "@/lib/program/action";
import { ProgramWithExercises, usePrograms } from "@/lib/program/programs-context";

type ProgramFormProps = {
	program: ProgramWithExercises;
	onClose: () => void;
};

export function ProgramForm({ program, onClose }: ProgramFormProps) {
	const { addItem, updateItem, deleteItem } = usePrograms();
	const [isPending, startTransition] = useTransition();
	const isEdit = !!program.id;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {		
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const id = formData.get("id") as string;
		const name = formData.get("name") as string;

		const optimisticProduct: ProgramWithExercises = {
			...program,
			id: id || crypto.randomUUID(),
			name,
		};


		onClose();

		startTransition(async () => {

			if (isEdit) {
				updateItem(optimisticProduct);
			} else {
				addItem(optimisticProduct);
			}

			try {
				await saveProgram(formData);
				toast.success(isEdit ? "Program updated" : "Program created");
			} catch (e) {
				if (isEdit) {
					// Rollback to original program state
					const originalProgram: ProgramWithExercises = {
						id: program.id,
						name: program.name || "",
						exercises: program.exercises || [],
					};
					updateItem(originalProgram);
				} else {
					deleteItem(optimisticProduct.id);
				}

				reportError(e, { extra: { id, name, isEdit } });
				toast.error(isEdit ? "Failed to update program" : "Failed to create program", {
					description: "Your changes were rolled back.",
				});
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
					<h2>{isEdit ? "Edit Program" : "New Program"}</h2>
					<CardAction>
						<Button type="button" onClick={onClose} variant="outline" size="icon">
							<X className="size-5" />
						</Button>
					</CardAction>
				</CardHeader>

				{isEdit && <input type="hidden" name="id" value={program.id} />}

				<CardContent>
					<FieldGroup>
						<FieldSet>
							<Field>
								<FieldLabel htmlFor="name">Program Name</FieldLabel>
								<Input
									id="name"
									type="text"
									name="name"
									defaultValue={program.name}
									placeholder="e.g., Push Day"
									required
								/>
							</Field>
						</FieldSet>
					</FieldGroup>
				</CardContent>

				<CardFooter className="flex-col gap-2">
					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending && <Spinner />}
						{isEdit ? "Save Changes" : "Create Program"}
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
