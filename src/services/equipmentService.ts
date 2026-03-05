import { Prisma} from '@prisma/client';
import prisma from '../lib/prisma';
import { IEquipment } from '../interfaces/equipment';

export const createOrUpdateEquipment = async (data: IEquipment, isCreate: boolean) => {
    const equipmentData: Prisma.EquipmentCreateInput = {
        name: data.name,
        category: data.category,
        status: data.status || "Available",
        condition: data.condition || "Excellent",
        details: data.details || null,
        weight: data.weight || null,
        yearManufactured: data.yearManufactured || null,
        hourlyRate: data.hourlyRate || null,
        dailyRate: data.dailyRate || null,
        monthlyRate: data.monthlyRate || null,
        images: data.images || null,
        company: { connect: { id: data.companyId } }
    };

    if (isCreate) {
        return await prisma.equipment.create({
            data: equipmentData
        });
    } else {
        if (!data.id) {
            throw new Error('Invalid equipment ID for update');
        }

        const uniqueEquipment = await prisma.equipment.findUnique({
            where: { id: data.id }
        });

        if (!uniqueEquipment) {
            throw new Error('Equipment not found');
        }

        return await prisma.equipment.update({
            where: { id: data.id },
            data: equipmentData
        });
    }
};

export const getAllEquipments = async () => {
    return await prisma.equipment.findMany({
        include: {
            company: true
        }
    });
};

export const getEquipmentById = async (id: number) => {
    return await prisma.equipment.findUnique({
        where: { id },
        include: {
            company: true
        }
    });
};

export const deleteEquipment = async (id: number) => {
    return await prisma.equipment.delete({
        where: { id }
    });
};
