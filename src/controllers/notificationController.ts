import { Request, Response } from 'express';
import * as notificationService from '../services/notificationService';
import { successResponse, errorResponse, notFoundResponse } from '../lib/responseHandler';

export const createNotification = async (req: Request, res: Response) => {
    try {
        const notification = await notificationService.createNotification(req.body);
        res.status(201).json(successResponse('Notification created successfully', notification));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to create notification', error));
    }
};

export const getNotifications = async (req: Request, res: Response) => {
    try {
        const notifications = await notificationService.getNotifications();
        res.json(successResponse('Notifications fetched successfully', notifications));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to fetch notifications', error));
    }
};

export const markAsRead = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const notification = await notificationService.markAsRead(id);
        res.json(successResponse('Notification marked as read', notification));
    } catch (error: any) {
        if (error?.message === 'Notification not found') {
            return res.status(404).json(notFoundResponse('Notification not found'));
        }
        res.status(500).json(errorResponse('Failed to update notification', error));
    }
};

export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        await notificationService.deleteNotification(id);
        res.json(successResponse('Notification deleted successfully'));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to delete notification', error));
    }
};
