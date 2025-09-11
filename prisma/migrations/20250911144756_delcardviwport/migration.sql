/*
  Warnings:

  - You are about to drop the column `cardBlur` on the `Theme` table. All the data in the column will be lost.
  - You are about to drop the column `cardColor` on the `Theme` table. All the data in the column will be lost.
  - You are about to drop the column `cardGradient` on the `Theme` table. All the data in the column will be lost.
  - You are about to drop the column `cardImage` on the `Theme` table. All the data in the column will be lost.
  - You are about to drop the column `cardType` on the `Theme` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Theme" DROP COLUMN "cardBlur",
DROP COLUMN "cardColor",
DROP COLUMN "cardGradient",
DROP COLUMN "cardImage",
DROP COLUMN "cardType";
