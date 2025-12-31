import { MuscleGroup } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

async function main() {
	const DEV_USER_ID = "dev-user-123";
	const DEV_ACCOUNT_ID = "dev-account-123";
	const EMAIL = "test@test.com";

	console.log("🚀 Starting seed...");

	// 1. Create or Update the Test User
	const user = await prisma.user.upsert({
		where: { id: DEV_USER_ID },
		update: {},
		create: {
			id: DEV_USER_ID,
			email: EMAIL,
			name: "Test User",
			emailVerified: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});

	await prisma.account.upsert({
		where: { id: DEV_ACCOUNT_ID },
		update: {},
		create: {
			id: "account-123",
			userId: user.id,
			accountId: EMAIL,
			providerId: "credential",
			password:
				"572915f247a8c5c4be56201a48bad84f:0b983fe1a6c3b51a9207c10d21e02f74606803844806e8d45f39e80ccb7b4529108cdc21b24488ae6a5ce60d61b9a2cf94294e20a50525903c0bd05aa07006ca",
			// Note: If using passwords, the hash must match Better Auth's expected format
			// It's often easier to just use an OAuth provider ID or a dummy string here
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});

	// 2. Create Exercises linked to that user
	const bench = await prisma.exercise.upsert({
		where: { id: "ex-bench" },
		update: {},
		create: {
			id: "ex-bench",
			name: "Bench Press",
			muscles: [MuscleGroup.chest],
			userId: user.id, // Use the ID from the user we just created
		},
	});

	const squat = await prisma.exercise.upsert({
		where: { id: "ex-squat" },
		update: {},
		create: {
			id: "ex-squat",
			name: "Back Squat",
			muscles: [MuscleGroup.quads],
			userId: user.id,
		},
	});

	// 3. Create the Program
	await prisma.program.upsert({
		where: { id: "prog-starter" },
		update: {},
		create: {
			id: "prog-starter",
			name: "Starter Strength",
			userId: user.id,
			exercises: {
				create: [
					{ exerciseId: bench.id, order: 0 },
					{ exerciseId: squat.id, order: 1 },
				],
			},
		},
	});

	console.log("✅ Seed complete: Created test user, exercises, and program.");
}

main()
	.then(async () => await prisma.$disconnect())
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
