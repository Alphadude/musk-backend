import { Prisma} from '@prisma/client';
import prisma from '../lib/prisma';
import { IOrder } from '../interfaces/order';

export const createOrUpdateOrder = async (data: IOrder, isCreate: boolean) => {
    const orderData: Prisma.OrderCreateInput = {
        orderNumber: data.orderNumber,
        renterName: data.renterName,
        renterEmail: data.renterEmail,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        totalPrice: data.totalPrice,
        status: data.status || "confirmed",
        paymentStatus: data.paymentStatus || "pending",
        company: data.company,
        contactPerson: data.contactPerson,
        phone: data.phone,
        industrySector: data.industrySector,
        projectLocation: data.projectLocation,
        totalDuration: data.totalDuration,
        crewRequested: data.crewRequested ?? false,
    };

    if (data.equipmentId) {
        orderData.equipment = { connect: { id: data.equipmentId } };
    }
    if (data.vesselId) {
        orderData.vessel = { connect: { id: data.vesselId } };
    }

    if (isCreate) {
        const order = await prisma.order.create({
            data: orderData
        });

        const { createNotification } = require('./notificationService');
        await createNotification({
            title: 'New Order Received',
            message: `A new order (${order.orderNumber}) has been placed by ${order.contactPerson || order.renterName}.`,
            type: 'Order',
            relatedId: order.id,
        });

        return order;
    } else {
        if (!data.id) {
            throw new Error('Invalid order ID for update');
        }

        const uniqueOrder = await prisma.order.findUnique({
            where: { id: data.id }
        });

        if (!uniqueOrder) {
            throw new Error('Order not found');
        }

        return await prisma.order.update({
            where: { id: data.id },
            data: orderData
        });
    }
};

export const getAllOrders = async () => {
    return await prisma.order.findMany({
        include: {
            equipment: true,
            vessel: true
        }
    });
};

export const getOrderById = async (id: number) => {
    return await prisma.order.findUnique({
        where: { id },
        include: {
            equipment: true,
            vessel: true
        }
    });
};

export const deleteOrder = async (id: number) => {
    return await prisma.order.delete({
        where: { id }
    });
};
