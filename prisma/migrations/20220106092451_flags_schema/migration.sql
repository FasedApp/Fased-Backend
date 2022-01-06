-- CreateTable
CREATE TABLE "FlagReason" (
    "id" SERIAL NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FlagReason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlagReport" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "reasonId" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FlagReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FlagReport" ADD CONSTRAINT "FlagReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
