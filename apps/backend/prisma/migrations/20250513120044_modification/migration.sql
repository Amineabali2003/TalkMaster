/*
  Warnings:

  - You are about to drop the column `room` on the `Talk` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Talk" DROP COLUMN "room",
ADD COLUMN     "day" INTEGER,
ADD COLUMN     "roomId" TEXT;

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_name_key" ON "Room"("name");

-- AddForeignKey
ALTER TABLE "Talk" ADD CONSTRAINT "Talk_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
