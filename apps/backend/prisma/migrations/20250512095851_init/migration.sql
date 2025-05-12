-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SPEAKER', 'ORGANIZER');

-- CreateEnum
CREATE TYPE "TalkStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'SCHEDULED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talk" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "level" TEXT NOT NULL,
    "status" "TalkStatus" NOT NULL DEFAULT 'PENDING',
    "speakerId" TEXT NOT NULL,
    "room" TEXT,
    "startTime" TIMESTAMP(3),

    CONSTRAINT "Talk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Talk" ADD CONSTRAINT "Talk_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
