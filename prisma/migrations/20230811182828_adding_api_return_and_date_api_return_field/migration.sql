/*
  Warnings:

  - Added the required column `apiReturn` to the `schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateApiReturn` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `schedule` ADD COLUMN `apiReturn` VARCHAR(191) NOT NULL,
    ADD COLUMN `dateApiReturn` DATETIME(3) NOT NULL;
