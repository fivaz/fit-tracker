/*
  Warnings:

  - You are about to drop the column `endedAt` on the `SetLog` table. All the data in the column will be lost.
  - Added the required column `order` to the `SetLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `SetLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SetLog" DROP COLUMN "endedAt",
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "sessionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SetLog" ADD CONSTRAINT "SetLog_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "WorkoutSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
