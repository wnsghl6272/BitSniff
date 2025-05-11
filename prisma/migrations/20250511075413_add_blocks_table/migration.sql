-- CreateTable
CREATE TABLE "blocks" (
    "number" BIGINT NOT NULL,
    "network" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "hash" TEXT NOT NULL,
    "parentHash" TEXT NOT NULL,
    "transactions" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blocks_pkey" PRIMARY KEY ("number","network")
);

-- CreateIndex
CREATE INDEX "blocks_network_idx" ON "blocks"("network");

-- CreateIndex
CREATE INDEX "blocks_timestamp_idx" ON "blocks"("timestamp");
