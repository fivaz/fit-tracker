import { ProgramsList } from "@/components/program/programs-list/programs-list";
import { getPrograms } from "@/lib/program/action";
import { devDelay } from "@/lib/utils";

export async function ProgramsContent() {
	const programs = await getPrograms();
	await devDelay();

	return <ProgramsList initialPrograms={programs} />;
}
