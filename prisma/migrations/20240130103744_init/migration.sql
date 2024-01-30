/*
  Warnings:

  - You are about to drop the column `membershipId` on the `member` table. All the data in the column will be lost.
  - You are about to drop the `gellary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `membership` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscription_fee` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imageUrl` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "gellary" DROP CONSTRAINT "gellary_userId_fkey";

-- DropForeignKey
ALTER TABLE "member" DROP CONSTRAINT "member_membershipId_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_membershipId_fkey";

-- DropForeignKey
ALTER TABLE "subscription_fee" DROP CONSTRAINT "subscription_fee_subscriptionId_fkey";

-- DropIndex
DROP INDEX "member_membershipId_key";

-- AlterTable
ALTER TABLE "member" DROP COLUMN "membershipId";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- DropTable
DROP TABLE "gellary";

-- DropTable
DROP TABLE "membership";

-- DropTable
DROP TABLE "subscription";

-- DropTable
DROP TABLE "subscription_fee";

-- DropEnum
DROP TYPE "SubscriptionType";

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallary" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "eventTime" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "gallary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallary" ADD CONSTRAINT "gallary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
