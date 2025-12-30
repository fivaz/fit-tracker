import Link from "next/link";
import { notFound } from "next/navigation";

import { ChevronLeft } from "lucide-react";
import { AnimatePresence } from "motion/react";

import { getExercises } from "@/components/exercise/action";
import { ExerciseEmptyState } from "@/components/exercise/exercise-empty-state/exercise-empty-state";
import { ExerciseFormButton } from "@/components/exercise/exercise-form-button/exercise-form-button";
import { ExerciseRow } from "@/components/exercise/exercise-row/exercise-row";
import { getProgramById, getPrograms } from "@/components/program/action";
import { ProgramEmptyState } from "@/components/program/program-empty-state/program-empty-state";
import { ProgramRow } from "@/components/program/program-row/program-row";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/lib/consts";

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function ProgramPage({ params }: PageProps) {
	const { id } = await params;

	const program = await getProgramById(id);

	if (!program) {
		notFound();
	}

	return (
		<div className="space-y-4 p-4">
			<header className="flex space-x-2">
				<Button asChild variant="ghost" size="icon">
					<Link href={ROUTES.PROGRAMS}>
						<ChevronLeft className="size-6" />
					</Link>
				</Button>
				<div>
					<h1 className="mb-1 text-xl tracking-tight">{program.name}</h1>
					<p className="text-primary text-sm font-normal">
						{program.exercises.length} exercise{program.exercises.length > 0 && "s"}
					</p>
				</div>
			</header>
			<Separator />

			<ExerciseFormButton programId={program.id} />

			<div className="space-y-2">
				<AnimatePresence mode="popLayout">
					{program.exercises.map((aux) => (
						<ExerciseRow key={aux.exerciseId} exercise={aux.exercise} programId={program.id} />
					))}
				</AnimatePresence>
			</div>

			{program.exercises.length === 0 && <ExerciseEmptyState />}
		</div>
	);
}
