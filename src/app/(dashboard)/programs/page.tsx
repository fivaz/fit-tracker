import ProgramManagerClient from "./program-manager/program-manager";
import { Program } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export async function getPrograms(): Promise<Program[]> {
	return prisma.program.findMany();
}

export default async function ProgramManager() {
	const programs = await getPrograms();

	return <ProgramManagerClient programs={programs} />;
}
