-- CreateTable
CREATE TABLE "Favorite" (
    "userId" TEXT NOT NULL,
    "talkId" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("userId","talkId")
);

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_talkId_fkey" FOREIGN KEY ("talkId") REFERENCES "Talk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
