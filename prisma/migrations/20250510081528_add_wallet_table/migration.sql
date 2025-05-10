-- CreateTable
CREATE TABLE "wallets" (
    "address" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("address","network")
);

-- CreateIndex
CREATE INDEX "wallets_address_idx" ON "wallets"("address");

-- CreateIndex
CREATE INDEX "wallets_network_idx" ON "wallets"("network");
