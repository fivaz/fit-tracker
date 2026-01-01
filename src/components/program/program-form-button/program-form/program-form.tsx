import { useState, useTransition } from "react";

import { AlertCircle, X } from "lucide-react";
import { motion } from "motion/react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Program } from "@/generated/prisma/client";
import { saveProgram } from "@/lib/program/action";
import { usePrograms } from "@/lib/program/programs-context";

type ProgramFormProps = {
	program: Partial<Program>;
	onClose: () => void;
};

export function ProgramForm({ program, onClose }: ProgramFormProps) {
	const { addItem, updateItem } = usePrograms();
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);
	const isEdit = !!program.id;

	const handleSubmit = async (formData: FormData) => {
		const id = formData.get("id") as string;
		const name = formData.get("name") as string;

		const optimisticProduct = {
			...program,
			id: id || crypto.randomUUID(),
			name,
		};

		if (id) {
			updateItem(optimisticProduct);
		} else {
			addItem(optimisticProduct);
		}

		onClose();

		startTransition(async () => {
			try {
				await saveProgram(formData);
			} catch (e) {
				setError(e instanceof Error ? e.message : "An unexpected error occurred");
				// TODO Handle error
			}
		});
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
							{error && (
								<Alert className="text-destructive bg-destructive/10">
									<AlertCircle className="size-4" />
									<AlertTitle>{error}</AlertTitle>
								</Alert>
							)}

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
