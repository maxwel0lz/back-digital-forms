-- CreateTable
CREATE TABLE "Forms" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "fields" JSONB NOT NULL,

    CONSTRAINT "Forms_pkey" PRIMARY KEY ("id")
);
