-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "Image" TEXT,
    "Heading" TEXT,
    "SubHeading" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "CategoryId" INTEGER NOT NULL,
    "SubCategory" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "IncidentDate" TIMESTAMP(3) NOT NULL,
    "SuspectName" TEXT NOT NULL,
    "CostMoney" INTEGER NOT NULL,
    "Description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_SubCategory_fkey" FOREIGN KEY ("SubCategory") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
