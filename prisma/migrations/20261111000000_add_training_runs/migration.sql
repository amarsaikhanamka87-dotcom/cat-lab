-- CreateTable
CREATE TABLE "training_runs" (
    "id" TEXT NOT NULL,
    "rounds" INTEGER NOT NULL,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "training_runs_pkey" PRIMARY KEY ("id")
);
