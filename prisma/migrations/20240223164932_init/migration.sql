/*
  Warnings:

  - You are about to drop the column `permanentAddress` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `presentAddress` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `permanentAddress` on the `grand_admin` table. All the data in the column will be lost.
  - You are about to drop the column `presentAddress` on the `grand_admin` table. All the data in the column will be lost.
  - You are about to drop the column `permanentAddress` on the `member` table. All the data in the column will be lost.
  - You are about to drop the column `presentAddress` on the `member` table. All the data in the column will be lost.
  - You are about to drop the column `permanentAddress` on the `super_admin` table. All the data in the column will be lost.
  - You are about to drop the column `presentAddress` on the `super_admin` table. All the data in the column will be lost.
  - You are about to drop the `gallary` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[presentAddressId]` on the table `member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[permanentAddressId]` on the table `member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `permanentAddressId` to the `member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `presentAddressId` to the `member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationAddress` to the `member` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('weekly', 'monthly', 'halfYearly', 'yearly', 'lifeTime');

-- CreateEnum
CREATE TYPE "RegisteringAddress" AS ENUM ('present', 'permanent');

-- DropForeignKey
ALTER TABLE "admin" DROP CONSTRAINT "admin_userId_fkey";

-- DropForeignKey
ALTER TABLE "gallary" DROP CONSTRAINT "gallary_userId_fkey";

-- DropForeignKey
ALTER TABLE "grand_admin" DROP CONSTRAINT "grand_admin_userId_fkey";

-- DropForeignKey
ALTER TABLE "super_admin" DROP CONSTRAINT "super_admin_userId_fkey";

-- AlterTable
ALTER TABLE "admin" DROP COLUMN "permanentAddress",
DROP COLUMN "presentAddress";

-- AlterTable
ALTER TABLE "grand_admin" DROP COLUMN "permanentAddress",
DROP COLUMN "presentAddress";

-- AlterTable
ALTER TABLE "member" DROP COLUMN "permanentAddress",
DROP COLUMN "presentAddress",
ADD COLUMN     "permanentAddressId" TEXT NOT NULL,
ADD COLUMN     "presentAddressId" TEXT NOT NULL,
ADD COLUMN     "registrationAddress" "RegisteringAddress" NOT NULL;

-- AlterTable
ALTER TABLE "super_admin" DROP COLUMN "permanentAddress",
DROP COLUMN "presentAddress";

-- DropTable
DROP TABLE "gallary";

-- CreateTable
CREATE TABLE "present_address" (
    "id" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "divisionId" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,
    "thanaId" TEXT NOT NULL,
    "postOfficeId" TEXT NOT NULL,
    "villageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "present_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permanent_address" (
    "id" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "divisionId" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,
    "thanaId" TEXT NOT NULL,
    "postOfficeId" TEXT NOT NULL,
    "villageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permanent_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "eventTime" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "SubscriptionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "memberShipFeeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "membership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership_fee" (
    "id" TEXT NOT NULL,
    "registrationFee" TEXT NOT NULL DEFAULT '0',
    "smartCardFee" TEXT NOT NULL DEFAULT '0',
    "membershipFee" TEXT NOT NULL DEFAULT '0',
    "totalFee" TEXT NOT NULL DEFAULT '0',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "membership_fee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isExpired" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "membershipId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "subscriptionFeeId" TEXT NOT NULL,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_fee" (
    "id" TEXT NOT NULL,
    "registrationFee" TEXT NOT NULL DEFAULT '0',
    "smartCardFee" TEXT NOT NULL DEFAULT '0',
    "subscriptionFee" TEXT NOT NULL DEFAULT '0',
    "totalFee" TEXT NOT NULL DEFAULT '0',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscription_fee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "villages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postOfficeId" TEXT NOT NULL,

    CONSTRAINT "villages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_offices" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "thanaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "post_offices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thana" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "districtId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "thana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "districts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "divisionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "districts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "divisions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "divisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "present_address_countryId_key" ON "present_address"("countryId");

-- CreateIndex
CREATE UNIQUE INDEX "present_address_divisionId_key" ON "present_address"("divisionId");

-- CreateIndex
CREATE UNIQUE INDEX "present_address_districtId_key" ON "present_address"("districtId");

-- CreateIndex
CREATE UNIQUE INDEX "present_address_thanaId_key" ON "present_address"("thanaId");

-- CreateIndex
CREATE UNIQUE INDEX "present_address_postOfficeId_key" ON "present_address"("postOfficeId");

-- CreateIndex
CREATE UNIQUE INDEX "present_address_villageId_key" ON "present_address"("villageId");

-- CreateIndex
CREATE UNIQUE INDEX "present_address_userId_key" ON "present_address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "permanent_address_countryId_key" ON "permanent_address"("countryId");

-- CreateIndex
CREATE UNIQUE INDEX "permanent_address_divisionId_key" ON "permanent_address"("divisionId");

-- CreateIndex
CREATE UNIQUE INDEX "permanent_address_districtId_key" ON "permanent_address"("districtId");

-- CreateIndex
CREATE UNIQUE INDEX "permanent_address_thanaId_key" ON "permanent_address"("thanaId");

-- CreateIndex
CREATE UNIQUE INDEX "permanent_address_postOfficeId_key" ON "permanent_address"("postOfficeId");

-- CreateIndex
CREATE UNIQUE INDEX "permanent_address_villageId_key" ON "permanent_address"("villageId");

-- CreateIndex
CREATE UNIQUE INDEX "permanent_address_userId_key" ON "permanent_address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "membership_memberShipFeeId_key" ON "membership"("memberShipFeeId");

-- CreateIndex
CREATE UNIQUE INDEX "post_offices_name_key" ON "post_offices"("name");

-- CreateIndex
CREATE UNIQUE INDEX "post_offices_postCode_key" ON "post_offices"("postCode");

-- CreateIndex
CREATE UNIQUE INDEX "thana_name_key" ON "thana"("name");

-- CreateIndex
CREATE UNIQUE INDEX "districts_name_key" ON "districts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "divisions_name_key" ON "divisions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "member_presentAddressId_key" ON "member"("presentAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "member_permanentAddressId_key" ON "member"("permanentAddressId");

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_presentAddressId_fkey" FOREIGN KEY ("presentAddressId") REFERENCES "present_address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_permanentAddressId_fkey" FOREIGN KEY ("permanentAddressId") REFERENCES "permanent_address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grand_admin" ADD CONSTRAINT "grand_admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "super_admin" ADD CONSTRAINT "super_admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "present_address" ADD CONSTRAINT "present_address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "present_address" ADD CONSTRAINT "present_address_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "present_address" ADD CONSTRAINT "present_address_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "divisions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "present_address" ADD CONSTRAINT "present_address_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "present_address" ADD CONSTRAINT "present_address_thanaId_fkey" FOREIGN KEY ("thanaId") REFERENCES "thana"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "present_address" ADD CONSTRAINT "present_address_postOfficeId_fkey" FOREIGN KEY ("postOfficeId") REFERENCES "post_offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "present_address" ADD CONSTRAINT "present_address_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "villages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permanent_address" ADD CONSTRAINT "permanent_address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permanent_address" ADD CONSTRAINT "permanent_address_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permanent_address" ADD CONSTRAINT "permanent_address_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "divisions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permanent_address" ADD CONSTRAINT "permanent_address_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permanent_address" ADD CONSTRAINT "permanent_address_thanaId_fkey" FOREIGN KEY ("thanaId") REFERENCES "thana"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permanent_address" ADD CONSTRAINT "permanent_address_postOfficeId_fkey" FOREIGN KEY ("postOfficeId") REFERENCES "post_offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permanent_address" ADD CONSTRAINT "permanent_address_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "villages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery" ADD CONSTRAINT "gallery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membership" ADD CONSTRAINT "membership_memberShipFeeId_fkey" FOREIGN KEY ("memberShipFeeId") REFERENCES "membership_fee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membership" ADD CONSTRAINT "membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "member"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_subscriptionFeeId_fkey" FOREIGN KEY ("subscriptionFeeId") REFERENCES "subscription_fee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "villages" ADD CONSTRAINT "villages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "villages" ADD CONSTRAINT "villages_postOfficeId_fkey" FOREIGN KEY ("postOfficeId") REFERENCES "post_offices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_offices" ADD CONSTRAINT "post_offices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_offices" ADD CONSTRAINT "post_offices_thanaId_fkey" FOREIGN KEY ("thanaId") REFERENCES "thana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thana" ADD CONSTRAINT "thana_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thana" ADD CONSTRAINT "thana_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "districts" ADD CONSTRAINT "districts_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "divisions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "districts" ADD CONSTRAINT "districts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "divisions" ADD CONSTRAINT "divisions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "divisions" ADD CONSTRAINT "divisions_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "countries" ADD CONSTRAINT "countries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
