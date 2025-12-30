"use client";
import { useState } from "react";
import Link from "next/link";

import { ChevronRight, Dumbbell, Pencil, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { ConfirmDialog } from "@/components/confirm-dialog/confirm-dialog";
import { deleteProgramAction } from "@/components/program/action";
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

type ProgramRowProps = {
	program: Program;
};

export function ProgramRow({ program }: ProgramRowProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	const handleDelete = async () => {
		try {
			await deleteProgramAction(program.id);
			setShowDeleteDialog(false);
		} catch (error) {
			console.error("Failed to delete program:", error);
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
					>
						<Card>
							<CardHeader>
								<CardTitle>{program.name}</CardTitle>
								<CardDescription>1 exercise</CardDescription>
								<CardAction className="space-x-2">
									<Button
										variant="outline"
										onClick={() => setIsEditing(true)}
										className="text-chart-2 hover:text-chart-3"
										size="icon-sm"
									>
										<Pencil className="size-4" />
									</Button>
									<Button
										variant="outline"
										className="text-destructive hover:text-red-500"
										size="icon-sm"
										onClick={() => setShowDeleteDialog(true)}
									>
										<Trash2 className="size-4" />
									</Button>
								</CardAction>
							</CardHeader>

							<CardContent>
								<Link href={`${ROUTES.PROGRAMS}/${program.id}`}>
									<Button className="w-full" variant="secondary">
										<Dumbbell className="size-4" />
										Manage Exercises
										<ChevronRight className="size-4" />
									</Button>
								</Link>
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
