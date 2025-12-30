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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Program } from "@/generated/prisma/client";

import { saveProgram } from "../../action";

type ProgramFormProps = {
	program?: Program; // If present, we are editing
	onClose: () => void;
};

export function ProgramForm({ program, onClose }: ProgramFormProps) {
	return (
		<motion.form
			initial={{ opacity: 0, height: 0, scale: 0.95 }}
			animate={{ opacity: 1, height: "auto", scale: 1 }}
			exit={{ opacity: 0, height: 0, scale: 0.95 }}
			transition={{ duration: 0.2 }}
			action={async (formData) => {
				await saveProgram(formData);
				onClose();
			}}
		>
			<Card>
				<CardHeader className="">
					<CardTitle>{program ? "Edit Program" : "New Program"}</CardTitle>
					<CardAction>
						<Button type="button" onClick={onClose} variant="outline" size="icon">
							<X className="size-5" />
						</Button>
					</CardAction>
				</CardHeader>

				{program && <input type="hidden" name="id" value={program.id} />}

				<CardContent>
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<Label htmlFor="name">Program Name</Label>
							<Input
								id="name"
								type="text"
								name="name"
								defaultValue={program?.name}
								placeholder="e.g., Push Day"
								required
							/>
						</div>
					</div>
				</CardContent>

				<CardFooter className="flex-col gap-2">
					<Button type="submit" className="w-full">
						{program ? "Save Changes" : "Create Program"}
					</Button>
					<Button type="button" variant="outline" onClick={onClose} className="w-full">
						Cancel
					</Button>
				</CardFooter>
			</Card>
		</motion.form>
	);
}
