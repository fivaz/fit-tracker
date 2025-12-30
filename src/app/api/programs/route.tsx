import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils-server";

export async function GET() {
	const userId = await getUserId();

	const programs = await prisma.program.findMany({
		select: { id: true, name: true },
		where: { userId },
		orderBy: { name: "asc" },
	});

	return NextResponse.json(programs);
}
