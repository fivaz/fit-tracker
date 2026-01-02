import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils-server";

export async function GET() {
	const userId = await getUserId();

	const programs = await prisma.program.findMany({
		select: { id: true, name: true },
		where: { userId, deletedAt: null },
		orderBy: { name: "desc" },
	});

	return NextResponse.json(programs);
}
