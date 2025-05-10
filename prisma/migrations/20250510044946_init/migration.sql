-- CreateTable
CREATE TABLE "bitcoin_transactions" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "blockNumber" BIGINT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "value" DECIMAL(18,8) NOT NULL,
    "fee" DECIMAL(18,8) NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bitcoin_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ethereum_transactions" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "blockNumber" BIGINT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "value" DECIMAL(36,18) NOT NULL,
    "gasFee" DECIMAL(36,18) NOT NULL,
    "gasPrice" DECIMAL(36,18) NOT NULL,
    "gasUsed" BIGINT NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ethereum_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blockchair_stats" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "network" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blockchair_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bitcoin_transactions_hash_key" ON "bitcoin_transactions"("hash");

-- CreateIndex
CREATE INDEX "bitcoin_transactions_blockNumber_idx" ON "bitcoin_transactions"("blockNumber");

-- CreateIndex
CREATE INDEX "bitcoin_transactions_timestamp_idx" ON "bitcoin_transactions"("timestamp");

-- CreateIndex
CREATE INDEX "bitcoin_transactions_fromAddress_idx" ON "bitcoin_transactions"("fromAddress");

-- CreateIndex
CREATE INDEX "bitcoin_transactions_toAddress_idx" ON "bitcoin_transactions"("toAddress");

-- CreateIndex
CREATE UNIQUE INDEX "ethereum_transactions_hash_key" ON "ethereum_transactions"("hash");

-- CreateIndex
CREATE INDEX "ethereum_transactions_blockNumber_idx" ON "ethereum_transactions"("blockNumber");

-- CreateIndex
CREATE INDEX "ethereum_transactions_timestamp_idx" ON "ethereum_transactions"("timestamp");

-- CreateIndex
CREATE INDEX "ethereum_transactions_fromAddress_idx" ON "ethereum_transactions"("fromAddress");

-- CreateIndex
CREATE INDEX "ethereum_transactions_toAddress_idx" ON "ethereum_transactions"("toAddress");

-- CreateIndex
CREATE INDEX "blockchair_stats_timestamp_idx" ON "blockchair_stats"("timestamp");

-- CreateIndex
CREATE INDEX "blockchair_stats_network_idx" ON "blockchair_stats"("network");

-- CreateIndex
CREATE UNIQUE INDEX "blockchair_stats_timestamp_network_key" ON "blockchair_stats"("timestamp", "network");
