import { useState, useTransition } from "react";
import Link from "next/link";

import { ChevronRight, Dumbbell, Pencil, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";

import { ProgramForm } from "@/components/program/program-form-button/program-form/program-form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/lib/consts";
import { useConfirm } from "@/lib/hooks/use-confirm";
import { reportError } from "@/lib/logger";
import { deleteProgramAction } from "@/lib/program/action";
import { ProgramWithExercises, usePrograms } from "@/lib/program/programs-context";

type ProgramRowProps = {
	program: ProgramWithExercises;
};

export function ProgramRow({ program }: ProgramRowProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [isPending, startTransition] = useTransition();
	const { deleteItem, addItem } = usePrograms();

	const confirm = useConfirm();

	const handleDelete = async () => {
		const confirmed = await confirm({
			title: "Delete Program",
			message: `Are you sure you want to delete "${program.name}"? This action cannot be undone.`,
		});

		if (!confirmed) return;

		const itemToRollback = { ...program };
		startTransition(async () => {
			deleteItem(program.id);

			try {
				await deleteProgramAction(program.id);
				toast.success("Deleted!");
			} catch (error) {
				addItem(itemToRollback);

				reportError(error, {
					level: "error",
					extra: { programId: program.id, programName: program.name },
				});

				toast.error("Failed to delete program");
			}
		});
	};

	return (
		<div className="relative">
			<AnimatePresence mode="wait">
				{isEditing ? (
					<ProgramForm key="edit-form" program={program} onClose={() => setIsEditing(false)} />
				) : (
					<motion.div
						key="display-row"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, x: -100 }}
						layout
					>
						<Card className={isPending ? "opacity-50 grayscale" : ""}>
							<CardHeader>
								<CardTitle>{program.name}</CardTitle>
								<CardDescription>
									{program.exercises.length} exercise{program.exercises.length !== 1 && "s"}
								</CardDescription>
								<CardAction className="space-x-2">
									<Button
										variant="outline"
										onClick={() => setIsEditing(true)}
										size="icon-sm"
										disabled={isPending}
									>
										<Pencil className="size-4" />
									</Button>
									<Button
										variant="outline"
										className="text-destructive hover:text-red-500"
										size="icon-sm"
										onClick={handleDelete}
										disabled={isPending}
									>
										<Trash2 className="size-4" />
									</Button>
								</CardAction>
							</CardHeader>

							<CardContent>
								<Button
									asChild
									className="text-chart-2 hover:text-chart-3 w-full"
									variant="outline"
									disabled={isPending}
								>
									<Link href={`${ROUTES.PROGRAMS}/${program.id}`}>
										<Dumbbell className="size-4" />
										Manage Exercises
										<ChevronRight className="size-4" />
									</Link>
								</Button>
							</CardContent>
						</Card>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
