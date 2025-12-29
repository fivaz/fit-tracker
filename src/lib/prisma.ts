import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });

// 1. Initialize the base client
const basePrisma = new PrismaClient({ adapter });

// 2. Create the extended client
const prisma = basePrisma.$extends({
	query: {
		program: {
			async findMany({ args, query }) {
				// Automatically filter out soft-deleted programs
				args.where = { ...args.where, deletedAt: null };
				return query(args);
			},
			async findFirst({ args, query }) {
				args.where = { ...args.where, deletedAt: null };
				return query(args);
			},
			async findUnique({ args, query }) {
				args.where = { ...args.where, deletedAt: null };
				return query(args);
			},
		},
	},
});

export { prisma };
