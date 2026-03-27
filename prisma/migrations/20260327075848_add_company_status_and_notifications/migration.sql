-- AlterTable
ALTER TABLE `company` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'Unverified';

-- AlterTable
ALTER TABLE `order` ADD COLUMN `company` VARCHAR(191) NULL,
    ADD COLUMN `contactPerson` VARCHAR(191) NULL,
    ADD COLUMN `crewRequested` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `industrySector` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `projectLocation` VARCHAR(191) NULL,
    ADD COLUMN `totalDuration` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `message` TEXT NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `relatedId` INTEGER NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
