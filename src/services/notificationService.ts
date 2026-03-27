import prisma from '../lib/prisma';
import { INotification } from '../interfaces/notification';

export const createNotification = async (data: Partial<INotification>) => {
    return await prisma.notification.create({
        data: {
            title: data.title!,
            message: data.message!,
            type: data.type!,
            relatedId: data.relatedId || null,
            isRead: false,
        }
    });
};

export const getNotifications = async () => {
    return await prisma.notification.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
};

export const markAsRead = async (id: number) => {
    const notification = await prisma.notification.findUnique({
        where: { id }
    });

    if (!notification) {
        throw new Error('Notification not found');
    }

    return await prisma.notification.update({
        where: { id },
        data: { isRead: true }
    });
};

export const deleteNotification = async (id: number) => {
    return await prisma.notification.delete({
        where: { id }
    });
};
