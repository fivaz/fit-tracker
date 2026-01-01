import { useState } from "react";

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

type ProgramFormProps = {
	program: Partial<Program>;
	onClose: () => void;
	onSave: (formData: FormData) => Promise<void>;
};

export function ProgramForm({ program, onClose, onSave }: ProgramFormProps) {
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);
	const isEdit = !!program.id;

	const handleSubmit = async (formData: FormData) => {
		setError(null);
		setIsPending(true);

		try {
			await onSave(formData);
			onClose();
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : "Something went wrong.");
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
