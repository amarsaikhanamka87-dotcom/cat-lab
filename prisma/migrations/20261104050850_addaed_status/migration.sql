-- CreateEnum
CREATE TYPE "Ground" AS ENUM ('training', 'testing');

-- CreateEnum
CREATE TYPE "Label" AS ENUM ('CAT', 'NOT_CAT');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'NOT_ACTIVE');

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "storagePath" TEXT NOT NULL,
    "label" "Label",
    "ground" "Ground" NOT NULL DEFAULT 'training',
    "creativeAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Photo_storagePath_key" ON "Photo"("storagePath");
