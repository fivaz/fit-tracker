/*
  Warnings:

  - You are about to drop the column `muscle` on the `Exercise` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('chest', 'back', 'shoulders', 'biceps', 'triceps', 'quads', 'hamstrings', 'glutes', 'calves', 'abs', 'forearms', 'traps');

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "muscle",
ADD COLUMN     "muscles" "MuscleGroup"[];
