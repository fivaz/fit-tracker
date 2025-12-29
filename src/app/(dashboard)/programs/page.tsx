import { ProgramManager } from "./program-manager/program-manager";
import { Program } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ProgramFormButton } from "@/app/(dashboard)/programs/program-form-button/program-form-button";
import { getUser } from "@/lib/auth/utils.actions";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/consts";

export async function getPrograms(): Promise<Program[]> {
	const user = await getUser();

	if (!user) {
		redirect(ROUTES.LOGIN);
	}

	return prisma.program.findMany({
		where: {
			userId: user.id,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
}

export default async function ProgramPage() {
	const programs = await getPrograms();

	console.log("programs", programs);

	return (
		<div className="space-y-4 p-4">
			{/* Header */}
			<div className="pt-2 pb-2">
				<h2 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">Workout Programs</h2>
				<p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
					{programs.length} programs
				</p>
			</div>
			<ProgramFormButton />
			<ProgramManager programs={programs} />
		</div>
	);
}
