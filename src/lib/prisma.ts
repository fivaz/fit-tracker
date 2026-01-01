import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";
import { devDelay } from "@/lib/utils";

import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });

prisma.$extends({
	query: {
		$allModels: {
			async $allOperations({ args, query }) {
				// Only delay in development
				await devDelay();
				return query(args);
			},
		},
	},
});

export { prisma };
