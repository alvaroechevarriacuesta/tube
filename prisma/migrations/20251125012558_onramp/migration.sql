-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('ONRAMP_TRANSACTION_STATUS_IN_PROGRESS', 'ONRAMP_TRANSACTION_STATUS_SUCCESS', 'ONRAMP_TRANSACTION_STATUS_FAILED');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "OnrampSession" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "txHash" TEXT,
    "failureReason" TEXT,
    "status" "SessionStatus" NOT NULL DEFAULT 'ONRAMP_TRANSACTION_STATUS_IN_PROGRESS',

    CONSTRAINT "OnrampSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OnrampSession_token_key" ON "OnrampSession"("token");

-- CreateIndex
CREATE UNIQUE INDEX "OnrampSession_txHash_key" ON "OnrampSession"("txHash");

-- AddForeignKey
ALTER TABLE "OnrampSession" ADD CONSTRAINT "OnrampSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
