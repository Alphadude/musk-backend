import { Prisma} from '@prisma/client';
import prisma from '../lib/prisma';
import { IVessel } from '../interfaces/vessel';

export const createOrUpdateVessel = async (data: IVessel, isCreate: boolean) => {
    const vesselData: Prisma.VesselCreateInput = {
        name: data.name,
        type: data.type,
        status: data.status || "Available",
        condition: data.condition || "Excellent",
        builder: data.builder || null,
        yearBuilt: data.yearBuilt || null,
        flag: data.flag || null,
        totalHP: data.totalHP || null,
        maxSpeed: data.maxSpeed || null,
        economicalSpeed: data.economicalSpeed || null,
        engineConfig: data.engineConfig || null,
        length: data.length || null,
        breadth: data.breadth || null,
        depth: data.depth || null,
        clearDeckSpace: data.clearDeckSpace || null,
        deckCargoCapacity: data.deckCargoCapacity || null,
        fuelConsumption: data.fuelConsumption || null,
        fuelCapacity: data.fuelCapacity || null,
        waterCapacity: data.waterCapacity || null,
        mainEngines: data.mainEngines || null,
        generators: data.generators || null,
        specialEquipment: data.specialEquipment || null,
        personCapacity: data.personCapacity || null,
        airConditioning: data.airConditioning || null,
        additionalAmenities: data.additionalAmenities || null,
        dailyRate: data.dailyRate || null,
        monthlyRate: data.monthlyRate || null,
        images: data.images || null,
        company: { connect: { id: data.companyId } }
    };

    if (isCreate) {
        return await prisma.vessel.create({
            data: vesselData
        });
    } else {
        if (!data.id) {
            throw new Error('Invalid vessel ID for update');
        }

        const uniqueVessel = await prisma.vessel.findUnique({
            where: { id: data.id }
        });

        if (!uniqueVessel) {
            throw new Error('Vessel not found');
        }

        return await prisma.vessel.update({
            where: { id: data.id },
            data: vesselData
        });
    }
};

export const getAllVessels = async () => {
    return await prisma.vessel.findMany({
        include: {
            company: true
        }
    });
};

export const getVesselById = async (id: number) => {
    return await prisma.vessel.findUnique({
        where: { id },
        include: {
            company: true
        }
    });
};

export const deleteVessel = async (id: number) => {
    return await prisma.vessel.delete({
        where: { id }
    });
};
