import { useState, useTransition } from "react";
import Link from "next/link";

import { ChevronRight, Dumbbell, Pencil, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { ConfirmDialog } from "@/components/confirm-dialog/confirm-dialog";
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
import { Program } from "@/generated/prisma/client";
import { ROUTES } from "@/lib/consts";
import { deleteProgramAction } from "@/lib/program/action";
import { ProgramWithExercises, usePrograms } from "@/lib/program/programs-context";

type ProgramRowProps = {
	program: Program & { exercises: { exerciseId: string }[] };
	onDelete: () => Promise<void>; // New prop
	onEdit: (formData: FormData) => Promise<void>; // New prop
};

export function ProgramRow({ program }: { program: ProgramWithExercises }) {
	const [isEditing, setIsEditing] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [isPending, startTransition] = useTransition();
	const { deleteProgram } = usePrograms(); // <--- Get delete function

	const handleDelete = async () => {
		deleteProgram(program.id);
		setShowDeleteDialog(false);

		try {
			await deleteProgramAction(program.id);
		} catch (error) {
			console.error("Failed to delete", error);
			// Ideally trigger a toast or page refresh here if it fails
		}
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
						<Card className={isPending ? "pointer-events-none opacity-50" : ""}>
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
										onClick={() => setShowDeleteDialog(true)}
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

			<ConfirmDialog
				isOpen={showDeleteDialog}
				title="Delete Program"
				message={`Are you sure you want to delete "${program.name}"? This action cannot be undone.`}
				onConfirm={handleDelete}
				onCancel={() => setShowDeleteDialog(false)}
			/>
		</div>
	);
}
