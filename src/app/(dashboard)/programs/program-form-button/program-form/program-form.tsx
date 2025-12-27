import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth/utils.actions";
import { ROUTES } from "@/lib/consts";

export async function createProgram(formData: FormData) {
	"use server";

	const user = await getUser();

	if (!user) {
		redirect(ROUTES.LOGIN);
	}

	const name = formData.get("name")?.toString();

	if (!name) throw new Error("Name is required");

	await prisma.program.create({
		data: { name, userId: user.id },
	});

	redirect(ROUTES.PROGRAMS);
}

export function ProgramForm() {
	return (
		<form
			action={createProgram}
			className="space-y-4 rounded-2xl border p-4 dark:border-gray-800 dark:bg-gray-900"
		>
			<div>
				<label className="block text-sm text-gray-600 dark:text-gray-400">Program Name *</label>
				<input
					type="text"
					name="name"
					placeholder="e.g., Push Day"
					required
					className="w-full rounded-xl border px-4 py-3 text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
				/>
			</div>

			<button
				type="submit"
				className="rounded-xl bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 dark:hover:bg-blue-500/80"
			>
				Create Program
			</button>
		</form>
	);
}
