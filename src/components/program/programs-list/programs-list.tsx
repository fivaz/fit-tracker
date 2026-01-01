"use client";

import { useOptimistic } from "react";

import { AnimatePresence } from "motion/react";

import { ProgramEmptyState } from "@/components/program/program-empty-state/program-empty-state";
import { ProgramFormButton } from "@/components/program/program-form-button/program-form-button";
import { ProgramRow } from "@/components/program/program-row/program-row";
import { Program } from "@/generated/prisma/client";
import { deleteProgramAction, saveProgram } from "@/lib/program/action";

type ProgramWithExercises = Program & { exercises: { exerciseId: string }[] };

type ProgramsListProps = {
	initialPrograms: ProgramWithExercises[];
};

export function ProgramsList({ initialPrograms }: ProgramsListProps) {
	const [optimisticPrograms, addOptimisticProgram] = useOptimistic(
		initialPrograms,
		(state, action: { type: "add" | "update" | "delete"; program: ProgramWithExercises }) => {
			switch (action.type) {
				case "add":
					return [...state, action.program];
				case "update":
					return state.map((p) => (p.id === action.program.id ? action.program : p));
				case "delete":
					return state.filter((p) => p.id !== action.program.id);
				default:
					return state;
			}
		},
	);

	const handleSave = async (formData: FormData) => {
		const id = formData.get("id") as string;
		const name = formData.get("name") as string;

		const optimisticProgram: ProgramWithExercises = {
			id: id || crypto.randomUUID(),
			name,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			userId: "temp-user",
			exercises: [],
		};

		if (id) {
			addOptimisticProgram({ type: "update", program: optimisticProgram });
		} else {
			addOptimisticProgram({ type: "add", program: optimisticProgram });
		}

		await saveProgram(formData);
	};

	const handleDelete = async (program: ProgramWithExercises) => {
		addOptimisticProgram({ type: "delete", program });
		await deleteProgramAction(program.id);
	};

	return (
		<div className="space-y-4">
			<ProgramFormButton onSave={handleSave} />

			{optimisticPrograms.length === 0 ? (
				<ProgramEmptyState />
			) : (
				<div className="space-y-2">
					<AnimatePresence mode="popLayout">
						{optimisticPrograms.map((program) => (
							<ProgramRow
								key={program.id}
								program={program}
								onDelete={() => handleDelete(program)}
								onEdit={handleSave}
							/>
						))}
					</AnimatePresence>
				</div>
			)}
		</div>
	);
}
