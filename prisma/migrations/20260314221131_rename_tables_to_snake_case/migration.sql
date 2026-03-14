-- DropForeignKey
ALTER TABLE `equipment` DROP FOREIGN KEY `Equipment_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_equipmentId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_vesselId_fkey`;

-- DropForeignKey
ALTER TABLE `vessel` DROP FOREIGN KEY `Vessel_companyId_fkey`;

-- AddForeignKey
ALTER TABLE `equipment` ADD CONSTRAINT `equipment_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vessel` ADD CONSTRAINT `vessel_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `equipment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_vesselId_fkey` FOREIGN KEY (`vesselId`) REFERENCES `vessel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `admin` RENAME INDEX `Admin_email_key` TO `admin_email_key`;

-- RenameIndex
ALTER TABLE `company` RENAME INDEX `Company_email_key` TO `company_email_key`;

-- RenameIndex
ALTER TABLE `order` RENAME INDEX `Order_orderNumber_key` TO `order_orderNumber_key`;
