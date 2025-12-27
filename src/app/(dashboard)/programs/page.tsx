import { ProgramManager } from "./program-manager/program-manager";
import { Program } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ProgramFormButton } from "@/app/(dashboard)/programs/program-form-button/program-form-button";
import { ProgramForm } from "@/app/(dashboard)/programs/program-form-button/program-form/program-form";

export async function getPrograms(): Promise<Program[]> {
	return prisma.program.findMany();
}

export default async function ProgramPage() {
	const programs = await getPrograms();

	return (
		<div className="space-y-4 p-4">
			{/* Header */}
			<div className="pt-2 pb-2">
				<h2 className="mb-1 text-xl">Workout Programs</h2>
				<p className="text-sm text-gray-600 dark:text-gray-400">{programs.length} programs</p>
			</div>
			{/* Add Button */}
			<ProgramFormButton>
				<ProgramForm />
			</ProgramFormButton>
			<ProgramManager programs={programs} />;
		</div>
	);
}
