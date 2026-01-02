import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils-server";

/**
 * Retrieves the current user's non-deleted programs and returns them ordered by name descending.
 *
 * @returns A JSON HTTP response containing an array of program objects with `id` and `name` properties.
 */
export async function GET() {
	const userId = await getUserId();

	const programs = await prisma.program.findMany({
		select: { id: true, name: true },
		where: { userId, deletedAt: null },
		orderBy: { name: "desc" },
	});

	return NextResponse.json(programs);
}