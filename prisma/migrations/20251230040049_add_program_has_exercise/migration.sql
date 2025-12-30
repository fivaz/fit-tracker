/*
  Warnings:

  - You are about to drop the column `order` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `programId` on the `Exercise` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_programId_fkey";

-- DropIndex
DROP INDEX "Exercise_programId_idx";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "order",
DROP COLUMN "programId";

-- CreateTable
CREATE TABLE "ProgramHasExercise" (
    "programId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProgramHasExercise_pkey" PRIMARY KEY ("programId","exerciseId")
);

-- AddForeignKey
ALTER TABLE "ProgramHasExercise" ADD CONSTRAINT "ProgramHasExercise_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramHasExercise" ADD CONSTRAINT "ProgramHasExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
