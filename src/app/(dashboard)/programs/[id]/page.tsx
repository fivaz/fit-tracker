import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ChevronLeft, Dumbbell } from "lucide-react";

import { ProgramExerciseList } from "@/components/program/program-detail-content/program-exercise-list";
import { ProgramDetailSkeleton } from "@/components/program/program-detail-skeleton/program-detail-skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/lib/consts";
import { ExerciseWithPrograms } from "@/lib/exercise/types";
import { getProgramByIdWithExercises } from "@/lib/program/action";
import type { ProgramExerciseRelation } from "@/lib/program/types";
import { startWorkout } from "@/lib/workout/action";

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function ProgramPage({ params }: PageProps) {
	const { id } = await params;

	const programWithExercises = await getProgramByIdWithExercises(id);

	if (!programWithExercises) {
		notFound();
	}

	const { program, exercises } = programWithExercises;

	return (
		<div className="space-y-4 p-4">
			<>
				<header className="flex space-x-2">
					<Button asChild variant="ghost" size="icon">
						<Link href={ROUTES.PROGRAMS}>
							<ChevronLeft className="size-6" />
						</Link>
					</Button>
					<div>
						<h1 className="mb-1 text-xl tracking-tight">{program.name}</h1>
						<p className="text-primary text-sm font-normal">
							{exercises.length} exercise{exercises.length !== 1 && "s"}
						</p>
					</div>
				</header>
				<Separator />
			</>

			<ProgramExerciseList programId={program.id} initialExercises={exercises} />

			<div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2">
				<Button
					size="lg"
					type="submit"
					disabled={exercises.length === 0}
					formAction={startWorkout.bind(null, program.id)}
				>
					Start Workout
					<Dumbbell />
				</Button>
			</div>
		</div>
	);
}
